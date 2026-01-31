import {createClient} from '@supabase/supabase-js';
import CONFIG from '../global/config';
import API_CONFIG from '../global/apiConfig';

/**
 * Thin wrapper around Supabase JS client used by the portfolio site.
 * Handles client initialization, error mapping, and consistent return shape.
 */
class ApiFetch {
  /**
   * Lazily initialize and cache a Supabase client instance.
   * @return {Object} Supabase client instance
   * @private
   */
  static #client() {
    if (!this._client) {
      if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) {
        throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
      }
      this._client = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    }
    return this._client;
  }

  /**
   * Get skills for a given section.
   * @param {string} section Skill section slug
   * @return {Promise<{data: any[]}>} List of skills
   */
  static async getSkills(section) {
    try {
      const {data, error} = await this.#client()
          .from(API_CONFIG.TABLE.skills)
          .select(API_CONFIG.SELECT.skills)
          .eq('type', section)
          .order('sort', {ascending: true});
      if (error) throw error;
      const withImages = await Promise.all(data.map(async (skill) => ({
        ...skill,
        cert_img: await this.#signedUrl(this.#withPrefix(skill.cert_img, API_CONFIG.IMG_PATH.skills)),
      })));
      return {data: withImages};
    } catch (error) {
      console.log('Failed to fetch skills Api', error);
      throw new Error('An error occurred while loading the skills data');
    }
  }

  /**
   * Get all projects.
   * @return {Promise<{data: any[]}>} List of projects
   */
  static async getProjects() {
    try {
      const {data, error} = await this.#client()
          .from(API_CONFIG.TABLE.projects)
          .select(API_CONFIG.SELECT.projects)
          .order('updated_at', {ascending: false});
      if (error) throw error;
      const withImages = await Promise.all(data.map(async (project) => ({
        ...project,
        img: await this.#signedUrl(this.#withPrefix(project.img, API_CONFIG.IMG_PATH.projectThumb)),
        img_hover: await this.#signedUrl(this.#withPrefix(project.img_hover, API_CONFIG.IMG_PATH.projectHover)),
      })));
      return {data: withImages};
    } catch (error) {
      console.log('Failed to fetch projects Api', error);
      throw new Error('An error occurred while loading the projects data');
    }
  }

  /**
   * Get all guestbook entries.
   * @return {Promise<{data: any[]}>} List of guestbook entries
   */
  static async getGuestbooks() {
    try {
      const {data, error} = await this.#client()
          .from(API_CONFIG.TABLE.guestbooks)
          .select(API_CONFIG.SELECT.guestbooks)
          .order('updated_at', {ascending: false});
      if (error) throw error;
      return {data};
    } catch (error) {
      console.log('Failed to fetch guestbooks Api', error);
      throw new Error('An error occurred while loading the guestbook data');
    }
  }

  /**
   * Post a new guestbook entry.
   * @param {FormData|Object} input FormData from UI or plain object
   * @return {Promise<void>} Resolves when insert succeeds
   */
  static async postGuestbook(input) {
    try {
      const payload = input instanceof FormData ? Object.fromEntries(input.entries()) : input;
      if (!payload.updated_at) {
        payload.updated_at = new Date().toISOString();
      }
      const {error} = await this.#client()
          .from(API_CONFIG.TABLE.guestbooks)
          .insert(payload, {returning: 'minimal'});
      if (error) throw error;
    } catch (error) {
      console.log('Failed to post guestbook Api', error);
      throw new Error('An error occurred while posting message');
    }
  }

  /**
   * Prefix a relative storage path with a folder if provided.
   * Ensures single slash between prefix and path.
   * @param {string} path original path
   * @param {string} prefix folder prefix (e.g., "skills/")
   * @return {string} combined path
   * @private
   */
  static #withPrefix(path = '', prefix = '') {
    if (!path) return '';
    // Absolute URLs should pass through untouched
    if (/^https?:\/\//i.test(path)) return path;
    if (!prefix) return path;
    const cleanPrefix = prefix.replace(/^\/+|\/+$/g, '');
    const cleanPath = path.replace(/^\/+/, '');
    // Avoid double-prefixing if the path already starts with the folder
    if (cleanPath.startsWith(`${cleanPrefix}/`)) return cleanPath;
    return `${cleanPrefix}/${cleanPath}`;
  }

  /**
   * Resolve an image path to a signed URL for private buckets.
   * @param {string} path relative storage object path
   * @return {Promise<string>} usable URL
   * @private
   */
  static async #signedUrl(path) {
    if (!path) return '';
    if (!CONFIG.SUPABASE_STORAGE_BUCKET) {
      return path;
    }

    try {
      const {data, error} = await this.#client()
          .storage
          .from(CONFIG.SUPABASE_STORAGE_BUCKET)
          .createSignedUrl(path, 60 * 60); // 1 hour
      if (error || !data?.signedUrl) {
        console.log('Failed to sign storage URL', error);
        return path;
      }
      return data.signedUrl;
    } catch (error) {
      console.log('Error signing storage URL', error);
      return path;
    }
  }
};

export default ApiFetch;
