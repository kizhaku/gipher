export class Giph{

  type: string;
  id: string;
  images: {
    fixed_width_downsampled: {
      url: String
    }
  };

  constructor() {
    this.type = '';
    this.id = '';
    this.images = {
      fixed_width_downsampled: {
        url: ''
      }
    };
  }
}