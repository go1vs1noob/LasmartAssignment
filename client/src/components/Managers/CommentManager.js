import { BehaviorSubject } from 'rxjs';
import { API_URL } from '../../../config/config';

export default class CommentManager {
  API_URL = API_URL;

  /**
     * Creates a comment manager which is used to work with comments in the database.
     *
     */
  constructor() {
    this.comments = [];
    this.commentsSubject = new BehaviorSubject(this.comments);
    this.getEmitComments();
  }

  getCommentsObservable() {
    return this.commentsSubject.asObservable();
  }

  /**
     * Retrieve all comments and emit them through commentsSubject.
     *
     * @return {Promise<void>} A promise that resolves when the comments have been retrieved and updated.
     */
  getEmitComments() {
    this.getAllComments()
      .then((comments) => {
        this.comments = comments;
        this.commentsSubject.next(this.comments);
      }).catch((error) => {
        console.error(error);
      });
  }

  getAllComments() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/comments`,
        method: 'GET',
        success(data) {
          resolve(data);
        },
        error(jqXHR, textStatus, errorThrown) {
          console.error('AJAX call failed:', errorThrown);
          reject(errorThrown);
        },
      });
    });
  }

  getCommentById(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/comments/${id}`,
        method: 'GET',
        success(data) {
          resolve(data);
        },
        error(jqXHR, textStatus, errorThrown) {
          console.error('AJAX call failed:', errorThrown);
          reject(errorThrown);
        },
      });
    });
  }

  addComment(commentDto) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/comments`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(commentDto),
        success: (data) => {
          this.comments.push(data);
          this.commentsSubject.next(this.comments);
          resolve(this.comments);
        },
        error(jqXHR, textStatus, errorThrown) {
          console.error('AJAX call failed:', errorThrown);
          reject(errorThrown);
        },
      });
    });
  }

  deleteComment(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/comments/${id}`,
        method: 'DELETE',
        success: (data) => {
          this.comments = this.comments.filter((comment) => comment.id !== data);
          this.commentsSubject.next(this.comments);
          resolve(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error('AJAX call failed:', errorThrown);
          reject(data);
        },
      });
    });
  }
}
