export type Locale = "en" | "ja" | "zh";

export const locales: Locale[] = ["en", "ja", "zh"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Dictionary = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    keywords: string[];
    naritaTitle: string;
    naritaDescription: string;
    hanedaTitle: string;
    hanedaDescription: string;
    driverTitle: string;
    driverDescription: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: string[];
    cta: string;
    imageAlt: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: string[];
    itemNote: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    items: { route: string; price: string }[];
    itemNote: string;
  };
  vehicles: {
    title: string;
    subtitle: string;
    items: { name: string; passengers: string; alt: string; image: string; galleryImages?: string[] }[];
  };
  reviews: {
    title: string;
    subtitle: string;
    items: string[];
  };
  booking: {
    title: string;
    subtitle: string;
    fields: {
      airport: string;
      flight: string;
      landingTime: string;
      hotel: string;
      passengers: string;
      luggage: string;
    };
    placeholders: {
      airport: string;
      flight: string;
      landingTime: string;
      hotel: string;
      passengers: string;
      luggage: string;
    };
    button: string;
    messageHeader: string;
  };
  narita: {
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle: string;
    travelTime: string;
  };
  haneda: {
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle: string;
    travelTime: string;
  };
  driver: {
    heroTitle: string;
    heroSubtitle: string;
    servicesTitle: string;
    services: string[];
  };
};

const commonVehicles = [
  {
    name: "Luxury Sedan",
    passengers: "Up to 3 passengers",
    image: "/images/sedan.jpg",
    alt: "Luxury sedan for Tokyo airport transfer"
  },
  {
    name: "Toyota Alphard",
    passengers: "Up to 5 passengers",
    image: "/images/alphard.jpg",
    alt: "Toyota Alphard private airport pickup in Tokyo"
  },
  {
    name: "Toyota Hiace",
    passengers: "Up to 8 passengers",
    image: "/images/hiace.jpg",
    alt: "Toyota Hiace van for Narita and Haneda airport transfer",
    galleryImages: ["/images/hiace1.jpg", "/images/hiace2.jpg"]
  }
];

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      homeTitle: "Tokyo Airport Transfer | Narita & Haneda to Hotels, Disney & Fuji",
      homeDescription:
        "Private Tokyo airport transfer from Narita or Haneda to Shinjuku, Ginza, Tokyo Station, Shinagawa, Disney, cruise terminals, and Mt Fuji day trips. English driver and WhatsApp quote.",
      keywords: [
        "Tokyo airport transfer",
        "Narita airport transfer",
        "Haneda airport transfer",
        "Tokyo airport pickup",
        "Tokyo private driver",
        "Tokyo English driver",
        "Tokyo hotel transfer",
        "Tokyo hotel to hotel transfer",
        "Tokyo hotel pickup",
        "Tokyo Shinkansen station transfer",
        "Tokyo Station transfer",
        "Shinagawa Station transfer",
        "Mt Fuji day trip private driver",
        "Mt Fuji day trip from Tokyo",
        "Narita to Tokyo private car",
        "Haneda to Tokyo private car",
        "Toyota Alphard airport transfer Tokyo",
        "Tokyo airport transfer English driver",
        "Narita Airport to Shinjuku transfer",
        "Narita Airport to Tokyo Disney transfer",
        "Haneda Airport to Ginza transfer",
        "Haneda Airport to Tokyo Station transfer",
        "Haneda Airport to Shinagawa transfer",
        "Tokyo cruise terminal transfer",
        "Tokyo Disney Resort airport transfer",
        "Tokyo to Mt Fuji private driver",
        "Tokyo hotel to Narita airport"
      ],
      naritaTitle: "Narita Airport Transfer to Tokyo | Private Car Pickup",
      naritaDescription:
        "Private Narita Airport transfer to Tokyo hotels, Shinjuku, Shibuya, Ginza, Shinagawa, and Tokyo Disney Resort. Toyota Alphard and Hiace options with fixed yen quotes on WhatsApp.",
      hanedaTitle: "Haneda Airport Transfer to Tokyo | Private Car Pickup",
      hanedaDescription:
        "Fast private Haneda Airport transfer to Ginza, Shinjuku, Shibuya, Shinagawa, and central Tokyo hotels. Door-to-door pickup, English-speaking driver, and transparent yen pricing.",
      driverTitle: "Tokyo Private Driver Service | Airport, Tours & Charters",
      driverDescription:
        "Hire a Tokyo private driver for airport transfers, hotel transfers, Shinkansen station pickup, city tours, Mt Fuji day trips, hourly charters, Toyota Alphard rides, and WhatsApp booking."
    },
    hero: {
      title: "Tokyo Airport Transfer",
      subtitle: "Private airport pickup from Narita Airport and Haneda Airport to Tokyo hotels, homes, and cruise terminals.",
      features: [
        "24 hour airport transfer service",
        "English-speaking driver",
        "Optional name-sign meet-and-greet at gate (+¥2,000)",
        "Fixed transparent pricing",
        "Pickup: 90 min free waiting from flight landing",
        "Drop-off: 30 min free waiting"
      ],
      cta: "Get Quote on WhatsApp",
      imageAlt: "Tokyo airport transfer private pickup vehicle"
    },
    services: {
      title: "Airport Transfer Services",
      subtitle: "Reliable private transport between Tokyo, Narita Airport, and Haneda Airport.",
      items: [
        "Narita Airport to Tokyo hotel",
        "Haneda Airport to Tokyo hotel",
        "Tokyo hotel to Narita Airport",
        "Tokyo hotel to Haneda Airport",
        "Tokyo hotel to hotel transfer",
        "Tokyo Station or Shinagawa Shinkansen pickup"
      ],
      itemNote: "Door-to-door, on time, and stress free."
    },
    pricing: {
      title: "Price Guide",
      subtitle: "Fixed transparent pricing with no surprise fees.",
      items: [
        { route: "Narita to Tokyo", price: "from $120+" },
        { route: "Haneda to Tokyo", price: "from $80+" }
      ],
      itemNote: "Optional arrival-gate name sign: +¥2,000 if requested (not included in the prices above)."
    },
    vehicles: {
      title: "Vehicles",
      subtitle: "Clean, spacious vehicles for solo travelers, families, and groups.",
      items: commonVehicles
    },
    reviews: {
      title: "Traveler Reviews",
      subtitle: "Consistent five-star feedback from international travelers.",
      items: [
        "Driver was waiting with a name sign.",
        "Very smooth airport pickup.",
        "Clean car and professional driver."
      ]
    },
    booking: {
      title: "Book Your Transfer",
      subtitle:
        "Send your flight, landing time, and hotel details to get a fast quote on WhatsApp. If you want a name sign at the arrival gate, it is +¥2,000—please say so when you message us.",
      fields: {
        airport: "Airport",
        flight: "Flight number",
        landingTime: "Landing time",
        hotel: "Hotel or address",
        passengers: "Passengers",
        luggage: "Luggage"
      },
      placeholders: {
        airport: "Narita or Haneda",
        flight: "JL123",
        landingTime: "May 3, 4:30 PM",
        hotel: "Shinjuku hotel",
        passengers: "2",
        luggage: "3 suitcases"
      },
      button: "Send on WhatsApp",
      messageHeader: "Hello, I need a Tokyo airport transfer quote."
    },
    narita: {
      heroTitle: "Narita Airport Transfer to Tokyo",
      heroSubtitle:
        "Private pickup from Narita Airport with fixed pricing and English-speaking drivers. Optional arrival-gate name sign: +¥2,000 if requested.",
      sectionTitle: "Narita Airport transfer",
      travelTime: "Travel time from Narita Airport to central Tokyo is typically 60 to 90 minutes depending on traffic."
    },
    haneda: {
      heroTitle: "Haneda Airport Transfer to Tokyo",
      heroSubtitle:
        "Fast private pickup from Haneda Airport to Tokyo hotels. Optional arrival-gate name sign: +¥2,000 if requested.",
      sectionTitle: "Haneda airport pickup",
      travelTime: "Travel time from Haneda Airport to central Tokyo is typically 30 to 60 minutes depending on traffic."
    },
    driver: {
      heroTitle: "Tokyo Private Driver Service",
      heroSubtitle: "Flexible private car service with English-speaking drivers for airport transfers, hotel transfers, Tokyo tours, Mt Fuji day trips, and hourly charters.",
      servicesTitle: "Private Driver Services",
      services: ["Tokyo city tour", "Mt Fuji day trip", "Hotel transfer", "Shinkansen station pickup", "Hourly private car charter"]
    }
  },
  ja: {
    meta: {
      homeTitle: "東京空港送迎 | 成田・羽田からホテル・ディズニー・富士山へ",
      homeDescription:
        "成田空港・羽田空港から新宿、銀座、東京駅、品川、東京ディズニー、クルーズターミナル、富士山日帰りまで対応するプライベート送迎。",
      keywords: [
        "東京 空港送迎",
        "成田空港 送迎",
        "羽田空港 送迎",
        "東京 空港ピックアップ",
        "東京 プライベートドライバー",
        "東京 英語ドライバー",
        "東京 ホテル送迎",
        "東京 ホテル間移動",
        "東京 ホテル移動",
        "東京駅 送迎",
        "品川駅 送迎",
        "新幹線駅 送迎",
        "富士山 日帰り",
        "富士山 日帰り 英語ドライバー",
        "成田 東京 ハイヤー",
        "成田空港 新宿 送迎",
        "成田空港 ディズニー 送迎",
        "羽田空港 銀座 送迎",
        "羽田空港 品川 送迎",
        "東京 クルーズターミナル 送迎",
        "東京ディズニー 空港送迎",
        "羽田 東京 ハイヤー"
      ],
      naritaTitle: "成田空港から東京への送迎 | プライベート空港ピックアップ",
      naritaDescription:
        "成田空港から東京市内ホテル、新宿、渋谷、銀座、東京ディズニーリゾートまでのプライベート送迎。固定料金でWhatsApp予約。到着ゲートでのネームプレートお迎えはオプション（+2,000円）。",
      hanedaTitle: "羽田空港から東京への送迎 | プライベートカー",
      hanedaDescription:
        "羽田空港から東京市内ホテルまでのスムーズなプライベート送迎。英語対応ドライバー、明朗な固定料金。到着ゲートでのネームプレートお迎えはオプション（+2,000円）。",
      driverTitle: "東京プライベートドライバー | 空港送迎・観光・貸切",
      driverDescription:
        "東京のプライベートドライバーサービス。空港送迎、ホテル間移動、新幹線駅送迎、市内観光、富士山日帰り、時間貸切に対応。英語対応ドライバーの手配も可能です。"
    },
    hero: {
      title: "東京空港送迎",
      subtitle: "成田空港・羽田空港から東京のホテル、ご自宅、クルーズターミナルまでのプライベート送迎。",
      features: [
        "24時間対応",
        "英語対応ドライバー",
        "到着ゲートでのネームプレートお迎えはオプション（+2,000円）",
        "明朗な固定料金",
        "お迎え: 到着後90分まで無料待機",
        "お送り: 30分まで無料待機"
      ],
      cta: "WhatsAppで見積もり",
      imageAlt: "東京空港送迎のプライベート車両"
    },
    services: {
      title: "空港送迎サービス",
      subtitle: "東京、成田空港、羽田空港を結ぶ安心のプライベート送迎。",
      items: [
        "成田空港から東京ホテル",
        "羽田空港から東京ホテル",
        "東京ホテルから成田空港",
        "東京ホテルから羽田空港",
        "東京ホテル間の移動",
        "東京駅・品川駅の新幹線送迎"
      ],
      itemNote: "ドアツードアで、時間通りに安心してご利用いただけます。"
    },
    pricing: {
      title: "料金目安",
      subtitle: "追加料金が分かりやすい固定料金制です。",
      items: [
        { route: "成田から東京", price: "$120+" },
        { route: "羽田から東京", price: "$80+" }
      ],
      itemNote: "到着ゲートでのネームプレートお迎えはオプション。ご希望の場合 +2,000円（上記料金には含みません）。"
    },
    vehicles: {
      title: "車両",
      subtitle: "お一人様、ご家族、グループ旅行まで快適にご利用いただけます。",
      items: commonVehicles
    },
    reviews: {
      title: "お客様の声",
      subtitle: "海外からのお客様にも高く評価されています。",
      items: [
        "名前入りのサインを持って待っていてくれました。",
        "空港からホテルまでとてもスムーズでした。",
        "車内が清潔でドライバーも丁寧でした。"
      ]
    },
    booking: {
      title: "送迎を予約",
      subtitle:
        "フライト、到着時刻、ホテル情報を送ると、WhatsAppですぐに見積もりできます。到着ゲートでのネームプレートお迎えが必要な場合はオプション（+2,000円）ですので、メッセージでお知らせください。",
      fields: {
        airport: "空港",
        flight: "便名",
        landingTime: "到着時刻",
        hotel: "ホテルまたは住所",
        passengers: "ご利用人数",
        luggage: "荷物"
      },
      placeholders: {
        airport: "成田または羽田",
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: "新宿のホテル",
        passengers: "2名",
        luggage: "スーツケース3個"
      },
      button: "WhatsAppで送信",
      messageHeader: "こんにちは。東京空港送迎の見積もりをお願いします。"
    },
    narita: {
      heroTitle: "成田空港から東京への送迎",
      heroSubtitle:
        "成田空港から東京市内まで、固定料金のプライベート送迎。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。",
      sectionTitle: "成田空港送迎",
      travelTime: "成田空港から東京中心部までは、交通状況により通常60分から90分ほどです。"
    },
    haneda: {
      heroTitle: "羽田空港から東京への送迎",
      heroSubtitle:
        "羽田空港から東京のホテルまで、スムーズなプライベート送迎。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。",
      sectionTitle: "羽田空港送迎",
      travelTime: "羽田空港から東京中心部までは、交通状況により通常30分から60分ほどです。"
    },
    driver: {
      heroTitle: "東京プライベートドライバー",
      heroSubtitle: "英語対応ドライバーによる空港送迎、ホテル間移動、東京観光、富士山日帰り、時間貸切のプライベートカーサービス。",
      servicesTitle: "プライベートドライバーサービス",
      services: ["東京市内観光", "富士山日帰り旅行", "ホテル間移動", "新幹線駅送迎", "時間貸切チャーター"]
    }
  },
  zh: {
    meta: {
      homeTitle: "東京機場接送 | 成田羽田到酒店迪士尼富士山包車",
      homeDescription:
        "東京機場接送服務，覆蓋成田機場、羽田機場到新宿、銀座、東京站、品川、迪士尼、郵輪碼頭和富士山一日遊。固定報價，可中文英文溝通。",
      keywords: [
        "東京機場接送",
        "東京接機",
        "成田機場接送",
        "羽田機場接送",
        "東京包車",
        "東京中文司機",
        "東京英文司機",
        "東京酒店移動",
        "東京酒店接送",
        "東京酒店換酒店",
        "東京酒店到酒店接送",
        "東京新幹線接送",
        "東京站接送",
        "品川站接送",
        "富士山一日遊",
        "富士山一日遊包車",
        "富士山一日遊英文司機",
        "成田到東京包車",
        "成田機場到新宿接送",
        "成田機場到迪士尼接送",
        "羽田機場到銀座接送",
        "羽田機場到品川接送",
        "東京迪士尼機場接送",
        "東京郵輪碼頭接送",
        "東京到富士山包車",
        "羽田到東京包車"
      ],
      naritaTitle: "成田機場到東京接送 | 東京中文包車接機",
      naritaDescription:
        "成田機場到東京酒店、新宿、澀谷、銀座、迪士尼的專車接送服務。固定報價，WhatsApp 快速預約。到達口舉牌接機為可選，另加 2,000 日元。",
      hanedaTitle: "羽田機場到東京接送 | 私人專車接機",
      hanedaDescription:
        "羽田機場到東京市區酒店的專車接送服務。準時接機、價格透明，可透過 WhatsApp 預約。到達口舉牌接機為可選，另加 2,000 日元。",
      driverTitle: "東京中文包車司機 | 接送機、旅遊與小時包車",
      driverDescription:
        "東京私人包車司機服務，適合機場接送、酒店移動、新幹線站接送、市區觀光、富士山一日遊和小時包車。可中文和英文溝通，WhatsApp 快速聯絡。"
    },
    hero: {
      title: "東京機場接送",
      subtitle: "成田機場、羽田機場到東京酒店、民宿、郵輪碼頭的私人專車接送服務。",
      features: [
        "24小時機場接送",
        "可中文和英文溝通",
        "到達口舉牌接機為可選（+2,000 日元）",
        "固定報價，價格透明",
        "接機免費等待90分鐘，從航班落地算起",
        "送機免費等待30分鐘"
      ],
      cta: "WhatsApp 獲取報價",
      imageAlt: "東京機場接送私人專車"
    },
    services: {
      title: "機場接送服務",
      subtitle: "提供東京、成田機場、羽田機場之間的專車接送。",
      items: [
        "成田機場到東京酒店",
        "羽田機場到東京酒店",
        "東京酒店到成田機場",
        "東京酒店到羽田機場",
        "東京酒店到酒店移動",
        "東京站、品川站新幹線接送"
      ],
      itemNote: "點對點直達，準時省心。"
    },
    pricing: {
      title: "價格參考",
      subtitle: "固定透明報價，無隱藏費用。",
      items: [
        { route: "成田到東京", price: "$120+" },
        { route: "羽田到東京", price: "$80+" }
      ],
      itemNote: "到達口舉牌接機為可選服務，需要時另加 2,000 日元（不含在上述參考價內）。"
    },
    vehicles: {
      title: "車型",
      subtitle: "適合個人、家庭和多人團隊出行。",
      items: commonVehicles
    },
    reviews: {
      title: "用戶評價",
      subtitle: "來自海外旅客的真實好評。",
      items: [
        "司機舉著姓名牌在出口等待。",
        "從機場到酒店非常順利。",
        "車輛乾淨，司機很專業。"
      ]
    },
    booking: {
      title: "預約接送",
      subtitle:
        "發送航班、落地時間、酒店和乘客人數資訊，我們會透過 WhatsApp 快速報價。如需到達口舉牌接機，為可選服務另加 2,000 日元，請在留言中說明。",
      fields: {
        airport: "機場",
        flight: "航班號",
        landingTime: "落地時間",
        hotel: "酒店或地址",
        passengers: "乘客人數",
        luggage: "行李"
      },
      placeholders: {
        airport: "成田或羽田",
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: "新宿酒店",
        passengers: "2人",
        luggage: "3個行李箱"
      },
      button: "透過 WhatsApp 發送",
      messageHeader: "您好，我需要東京機場接送報價。"
    },
    narita: {
      heroTitle: "成田機場到東京接送",
      heroSubtitle:
        "成田機場私人接機，固定報價，適合家庭、商務和多人行李。到達口舉牌接機為可選，另加 2,000 日元。",
      sectionTitle: "成田機場接送",
      travelTime: "成田機場到東京市區通常需要60到90分鐘，具體時間取決於路況。"
    },
    haneda: {
      heroTitle: "羽田機場到東京接送",
      heroSubtitle:
        "羽田機場到東京酒店的快速專車接送，司機準時等候，WhatsApp 即時溝通。到達口舉牌接機為可選，另加 2,000 日元。",
      sectionTitle: "羽田機場接送",
      travelTime: "羽田機場到東京市區通常需要30到60分鐘，具體時間取決於路況。"
    },
    driver: {
      heroTitle: "東京中文包車司機",
      heroSubtitle: "適合機場接送、酒店移動、新幹線站接送、東京市區觀光、富士山一日遊和小時包車，可中文和英文溝通。",
      servicesTitle: "私人司機服務",
      services: ["東京市區觀光", "富士山一日遊", "酒店移動", "新幹線站接送", "小時包車"]
    }
  }
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
