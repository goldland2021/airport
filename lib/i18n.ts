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
    items: { name: string; passengers: string; alt: string; image: string }[];
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
    alt: "Toyota Hiace van for Narita and Haneda airport transfer"
  }
];

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      homeTitle: "Tokyo Airport Transfer | Narita & Haneda Private Car",
      homeDescription:
        "Book a private Tokyo airport transfer from Narita or Haneda, Tokyo hotel transfers, and Mt Fuji day trips with English-speaking drivers. Fixed yen quotes, Toyota Alphard and Hiace options, 24/7 WhatsApp support.",
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
        "Haneda Airport to Ginza transfer",
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
      homeTitle: "東京空港送迎 | 成田・羽田のプライベート送迎",
      homeDescription:
        "成田空港・羽田空港から東京市内ホテルまでの空港送迎、ホテル間移動、富士山日帰り観光に対応。固定料金、英語対応ドライバー、WhatsAppで簡単予約。",
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
      homeTitle: "东京机场接送 | 成田与羽田机场中文包车",
      homeDescription:
        "东京机场接送服务，覆盖成田机场、羽田机场、东京酒店移动、新干线站接送和富士山一日游。固定报价、WhatsApp 快速联系，可中文和英文沟通。",
      keywords: [
        "东京机场接送",
        "东京接机",
        "成田机场接送",
        "羽田机场接送",
        "东京包车",
        "东京中文司机",
        "东京英文司机",
        "东京酒店移动",
        "东京酒店接送",
        "东京酒店换酒店",
        "东京酒店到酒店接送",
        "东京新干线接送",
        "东京站接送",
        "品川站接送",
        "富士山一日游",
        "富士山一日游包车",
        "富士山一日游英文司机",
        "成田到东京包车",
        "羽田到东京包车"
      ],
      naritaTitle: "成田机场到东京接送 | 东京中文包车接机",
      naritaDescription:
        "成田机场到东京酒店、新宿、涩谷、银座、迪士尼的专车接送服务。固定报价，WhatsApp 快速预约。到达口举牌接机为可选，另加 2,000 日元。",
      hanedaTitle: "羽田机场到东京接送 | 私人专车接机",
      hanedaDescription:
        "羽田机场到东京市区酒店的专车接送服务。准时接机、价格透明，可通过 WhatsApp 预约。到达口举牌接机为可选，另加 2,000 日元。",
      driverTitle: "东京中文包车司机 | 接送机、旅游与小时包车",
      driverDescription:
        "东京私人包车司机服务，适合机场接送、酒店移动、新干线站接送、市区观光、富士山一日游和小时包车。可中文和英文沟通，WhatsApp 快速联系。"
    },
    hero: {
      title: "东京机场接送",
      subtitle: "成田机场、羽田机场到东京酒店、民宿、邮轮码头的私人专车接送服务。",
      features: [
        "24小时机场接送",
        "可中文和英文沟通",
        "到达口举牌接机为可选（+2,000 日元）",
        "固定报价，价格透明",
        "接机免费等待90分钟，从航班落地算起",
        "送机免费等待30分钟"
      ],
      cta: "WhatsApp 获取报价",
      imageAlt: "东京机场接送私人专车"
    },
    services: {
      title: "机场接送服务",
      subtitle: "提供东京、成田机场、羽田机场之间的专车接送。",
      items: [
        "成田机场到东京酒店",
        "羽田机场到东京酒店",
        "东京酒店到成田机场",
        "东京酒店到羽田机场",
        "东京酒店到酒店移动",
        "东京站、品川站新干线接送"
      ],
      itemNote: "点对点直达，准时省心。"
    },
    pricing: {
      title: "价格参考",
      subtitle: "固定透明报价，无隐藏费用。",
      items: [
        { route: "成田到东京", price: "$120+" },
        { route: "羽田到东京", price: "$80+" }
      ],
      itemNote: "到达口举牌接机为可选服务，需要时另加 2,000 日元（不含在上述参考价内）。"
    },
    vehicles: {
      title: "车型",
      subtitle: "适合个人、家庭和多人团队出行。",
      items: commonVehicles
    },
    reviews: {
      title: "用户评价",
      subtitle: "来自海外旅客的真实好评。",
      items: [
        "司机举着姓名牌在出口等待。",
        "从机场到酒店非常顺利。",
        "车辆干净，司机很专业。"
      ]
    },
    booking: {
      title: "预约接送",
      subtitle:
        "发送航班、落地时间、酒店和乘客人数信息，我们会通过 WhatsApp 快速报价。如需到达口举牌接机，为可选服务另加 2,000 日元，请在留言中说明。",
      fields: {
        airport: "机场",
        flight: "航班号",
        landingTime: "落地时间",
        hotel: "酒店或地址",
        passengers: "乘客人数",
        luggage: "行李"
      },
      placeholders: {
        airport: "成田或羽田",
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: "新宿酒店",
        passengers: "2人",
        luggage: "3个行李箱"
      },
      button: "通过 WhatsApp 发送",
      messageHeader: "您好，我需要东京机场接送报价。"
    },
    narita: {
      heroTitle: "成田机场到东京接送",
      heroSubtitle:
        "成田机场私人接机，固定报价，适合家庭、商务和多人行李。到达口举牌接机为可选，另加 2,000 日元。",
      sectionTitle: "成田机场接送",
      travelTime: "成田机场到东京市区通常需要60到90分钟，具体时间取决于路况。"
    },
    haneda: {
      heroTitle: "羽田机场到东京接送",
      heroSubtitle:
        "羽田机场到东京酒店的快速专车接送，司机准时等候，WhatsApp 即时沟通。到达口举牌接机为可选，另加 2,000 日元。",
      sectionTitle: "羽田机场接送",
      travelTime: "羽田机场到东京市区通常需要30到60分钟，具体时间取决于路况。"
    },
    driver: {
      heroTitle: "东京中文包车司机",
      heroSubtitle: "适合机场接送、酒店移动、新干线站接送、东京市区观光、富士山一日游和小时包车，可中文和英文沟通。",
      servicesTitle: "私人司机服务",
      services: ["东京市区观光", "富士山一日游", "酒店移动", "新干线站接送", "小时包车"]
    }
  }
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
