import {Object3D} from 'three';

/**
 *  This is an implementation of a regular three.js Object3D that allows for embedding
 *  a HTML element.
 * 
 *  Cause of how the CSS3D renderer works, the element passed to the constructor will
 *  have the CSS position set to absolute.
 */
export class CSS3DObject extends Object3D {
  public element: HTMLElement;

  /**
   * @param element Target Sprite DOM Element
   */
  constructor(element: HTMLElement) {
    super();

    this.element = element;
    this.element.style.position = 'absolute';

    this.addEventListener('removed', () => {
      this.traverse((object: Object3D) => {
        if (
          object instanceof CSS3DObject &&
          object.element instanceof Element &&
          object.element.parentNode !== null
        ) {
          object.element.parentNode.removeChild(object.element);
        }
      });
    });
  }

  /**
   * Copy content from another CSS3DObject.
   * @param source Source CSS3DObject
   * @param recursive
   * @returns CSS3DObject
   */
  copy(source: CSS3DObject, recursive?: boolean) {
    Object3D.prototype.copy.call(this, source, recursive);

    this.element = source.element.cloneNode(true) as HTMLElement;

    return this;
  }
}
