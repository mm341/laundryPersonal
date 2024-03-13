export interface cardInterface {
  body: string;
  icon: string;
  title: string;
}

export interface Homefaqs {
  section_title: string;
  cards: cardInterface[];
}

export interface HomeSliders {
  cards: {
    body: string;
  }[];
}

export interface HomeData {
  faqs: Homefaqs;
  features: Homefaqs;
  sliders: HomeSliders;
}
