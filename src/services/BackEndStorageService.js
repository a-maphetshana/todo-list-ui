import axios from 'axios'

export const apiBaseUrl = 'http://localhost/todo-list-api'
export const apiVerion = '1.0'
export const headers = { 'Content-Type': 'application/json' }

export const BackEndStorageService = {
  /**
   * Get items from BackEndStorage
   * Allows saving any JSON data
   * @param {Integer} id - Key to retrieve data by
   * @param {*} [fallback] - a fallback value if key is not found
   * @return {*}
   */
  async getItems(fallback) {
    let response = await axios.get(`${apiBaseUrl}/${apiVerion}/todolist/`, { headers })
      .then(function (response) {
        return response.data ? response.data : fallback
      })
      .catch(function () {
        return fallback;
      });
    return response;
  },
  /**
   * @param {*} value - Value to save. Transforms to a JSON string
   */
   async postItem(value = {}) {
    return await axios.post(`${apiBaseUrl}/${apiVerion}/todolist/`, window.JSON.stringify(value), { headers });
  },

  /**
  * @param {*} value - Value to save. Transforms to a JSON string
  */
  async putItem(value = {}) {
    return await axios.put(`${apiBaseUrl}/${apiVerion}/todolist/${value.toDoListItemID}`, window.JSON.stringify(value), { headers });
  },
  /**
 * Archive item by its id
 * @param {Integer} id
 */
  async archiveItem(id) {
    return await axios.delete(`${apiBaseUrl}/${apiVerion}/todolist/archive/${id}`);
  },

  /**
* Restore item by its id
* @param {Integer} id
*/
async restoreItem(id) {
    return await axios.delete(`${apiBaseUrl}/${apiVerion}/todolist/restore/${id}`);
  },
  /**
   * Remove item by its id
   * @param {Integer} id
   */
   async removeItem(id) {
    return await axios.delete(`${apiBaseUrl}/${apiVerion}/todolist/remove/${id}`);
  },
}
