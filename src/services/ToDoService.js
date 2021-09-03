import { BackEndStorageService } from './BackEndStorageService'

/**
 * @typedef TodoItem
 * @property {string} toDoListItemID
 * @property {string} name
 * @property {Date} date
 * @property {boolean} isCompleted 
 * @property {boolean} isDeleted
 */

export const ToDoService = {
  /**
   * Stores all the provided todo items
   * @param {TodoItem[]} items
   */
  async saveItem(item) {
    return BackEndStorageService.postItem(item).then(response => {
      return response;
    });
  },
  /**
   * Fetch all Todo items, even the deleted ones
   * @return {TodoItem[]}
   */
  async fetchAllWithDeleted() {
    return BackEndStorageService.getItems([]).then(response => {
      return response;
    });
  },
  /**
   * Fetch only the deleted todo items
   * @return {TodoItem[]}
   */
  async fetchDeleted() {
    return ToDoService.fetchAllWithDeleted().then(response => {
      return response.filter(item => item.isDeleted)
    })
  },
  /**
   * Fetches all todo items. Does not return deleted items.
   * @return {TodoItem[]}
   */
  fetchAll() {
    return ToDoService.fetchAllWithDeleted().then(response => {
      return response.filter(item => !item.isDeleted)
    })
  },
  /**
   * Updates a todo item.
   * @param {String} itemId
   * @param {TodoItem} payload
   */
  async updateItem(itemId, payload) {
    return await BackEndStorageService.putItem(payload);
  },
  /**
  * Archive a todo item from the list
  * @param {string} itemId
  */
  async archiveItem(itemId) {
    return await BackEndStorageService.archiveItem(itemId)
  },
  /**
* Restore a todo item from the list
* @param {string} itemId
*/
  async restoreItem(itemId) {
    return await BackEndStorageService.restoreItem(itemId)
  },
  /**
   * Remove a todo item from the list
   * @param {string} itemId
   */
  async removeItem(itemId) {
    return await BackEndStorageService.removeItem(itemId)
  }
}
