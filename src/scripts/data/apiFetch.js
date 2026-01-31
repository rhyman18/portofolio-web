import {createClient} from '@supabase/supabase-js';
import CONFIG from '../global/config';

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
          .from('skills')
          .select('*')
          .eq('type', section);
      if (error) throw error;
      return {data};
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
          .from('projects')
          .select('*')
          .order('updated_at', {ascending: false});
      if (error) throw error;
      return {data};
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
          .from('guestbooks')
          .select('*');
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
      const {error} = await this.#client()
          .from('guestbooks')
          .insert(payload, {returning: 'minimal'});
      if (error) throw error;
    } catch (error) {
      console.log('Failed to post guestbook Api', error);
      throw new Error('An error occurred while posting message');
    }
  }
};

export default ApiFetch;
