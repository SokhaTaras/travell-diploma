import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {Subject} from 'rxjs';

export class MetaRxData {
  title: string;
  description: string;
  keywords: string;
  image: string;

  setImage(image: string): MetaRxData {
    this.image = image;
    return this;
  }

  setTitle(title: string): MetaRxData {
    this.title = title;
    return this;
  }

  setDescription(description: string): MetaRxData {
    this.description = description;
    return this;
  }

  setKeywords(keywords: string): MetaRxData {
    this.keywords = keywords;
    return this;
  }
}

@Injectable()
export class MetaRxService {
  private _meta = new Subject<MetaRxData>();
  meta$ = this._meta.asObservable();

  constructor(private title: Title,
              private meta: Meta) {
    this.meta$.subscribe(value => {
      this.meta.removeTag('name=\'og:title\'');
      this.meta.removeTag('name=\'keywords\'');
      this.meta.removeTag('name=\'og:url\'');
      this.meta.removeTag('name=\'og:description\'');
      this.meta.removeTag('name=\'description\'');
      title.setTitle(value.title);
      meta.addTag({
        'og:title': value.title
      });
      if (value.image) {
        meta.addTag({
          'og:image': value.image
        });
      }
      if (value.keywords) {
        meta.addTag({
          'keywords': value.keywords
        });
      }
      if (value.description) {
        meta.addTag({
          'description': value.description
        });
        meta.addTag({
          'og:description': value.description
        });
      }
    });
  }

  changeMetaData(o: MetaRxData) {
    this._meta.next(o);

  }

}
