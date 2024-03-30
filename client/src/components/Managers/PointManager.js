import { BehaviorSubject } from 'rxjs';
import { API_URL } from '../../../config/config';

export default class PointManager {
  API_URL = API_URL;

  /**
     * Creates a point manager which is used to work with points in the database.
     *
     */
  constructor() {
    this.points = [];
    this.pointsSubject = new BehaviorSubject(this.points);
    this.getEmitPoints();
  }

  /**
     * Retrieve all points and emit them through pointsSubject.
     *
     * @return {Promise<void>} A promise that resolves when the points have been retrieved and updated.
     */
  getEmitPoints() {
    this.getAllPoints()
      .then((points) => {
        this.points = points;
        this.pointsSubject.next(this.points);
      }).catch((error) => {
        console.error(error);
      });
  }

  getPointsObservable() {
    return this.pointsSubject.asObservable();
  }

  addPoint(pointDto) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/points`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(pointDto),
        success: (data) => {
          this.points.push(data);
          this.pointsSubject.next(this.points);
          resolve(data);
        },
        error(jqXHR, textStatus, errorThrown) {
          console.error('AJAX call failed:', errorThrown);
          reject(errorThrown);
        },
      });
    });
  }

  deletePoint(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/points/${id}`,
        method: 'DELETE',
        success: (data) => {
          this.points = this.points.filter((point) => point.id !== data);
          this.pointsSubject.next(this.points);
          resolve(data);
        },
        error(jqXHR, textStatus, errorThrown) {
          console.error('AJAX call failed:', errorThrown);
          reject(errorThrown);
        },
      });
    });
  }

  getAllPoints() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/points`,
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

  getPointById(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/points/${id}`,
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

  patchPoint(patchPointDto) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.API_URL}/points`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(patchPointDto),
        success: (data) => {
          this.getEmitPoints();
          resolve(data);
        },
        error(jqXHR, textStatus, errorThrown) {
          console.error('AJAX call failed:', errorThrown);
          reject(errorThrown);
        },
      });
    });
  }
}
