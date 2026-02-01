import CONFIG from '../global/config';

/**
 * Lightweight cache utilities used by the service worker to manage offline data.
 */
const CacheHelper = {
  /**
   * Pre-cache the application shell assets.
   * @param {RequestInfo[]} requests List of URLs/Requests to cache.
   * @return {Promise<void>}
   */
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },

  /**
   * Remove caches that do not match the current cache name.
   * @return {Promise<void>}
   */
  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
        .filter((name) => name !== CONFIG.CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName));
  },

  /**
   * Serve from cache first, then update cache in the background.
   * @param {RequestInfo} request Fetch request or URL string.
   * @return {Promise<Response>}
   */
  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      this._fetchRequest(request);
      return response;
    }
    return this._fetchRequest(request);
  },

  /**
   * Open the current cache storage.
   * @return {Promise<Cache>}
   * @private
   */
  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  /**
   * Fetch from network and refresh cache when successful.
   * @param {RequestInfo} request
   * @return {Promise<Response>}
   * @private
   */
  async _fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    await this._addCache(request);
    return response;
  },

  /**
   * Add a fetched request to cache.
   * @param {RequestInfo} request
   * @return {Promise<void>}
   * @private
   */
  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request);
  },
};

export default CacheHelper;
