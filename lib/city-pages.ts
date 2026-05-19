import { cityPath, type CityAirport, type CitySlug } from "./city-routes";
import type { Locale } from "./i18n";
import type { HomeSeoContent } from "./seo-content";
import { AIRPORTS } from "./toll-routes";

type CityPageSlug = Exclude<CitySlug, "tokyo">;

type LocalizedCityBasics = {
  cityName: string;
  airportPhrase: string;
  areaPhrase: string;
  dayTripPhrase: string;
  hotelExample: string;
  imageAlt: string;
};

type CitySeoRoute = {
  title: string;
  description: string;
  href?: string;
};

type CitySeoProfile = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  routesTitle: string;
  routesSubtitle: string;
  routes: CitySeoRoute[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

export type CityPageContent = {
  slug: CityPageSlug;
  path: string;
  cityName: string;
  citySearchName: string;
  routeAirports: CityAirport[];
  defaultAirportId: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: string[];
    imageSrc: string;
    imageAlt: string;
  };
  quote: {
    title: string;
    subtitle: string;
    directNote: string;
  };
  waiting: {
    pickupNote: string;
    delayNote: string;
    promiseTitle: string;
    promises: [string, string][];
  };
  booking: {
    title: string;
    subtitle: string;
    placeholders: {
      airport: string;
      flight: string;
      landingTime: string;
      hotel: string;
      passengers: string;
      luggage: string;
    };
    messageHeader: string;
  };
  seo: HomeSeoContent;
};

const cityAirports: Record<CityPageSlug, CityAirport[]> = {
  osaka: [
    { id: "kansai", ...AIRPORTS.kansai },
    { id: "itami", ...AIRPORTS.itami }
  ],
  hokkaido: [
    { id: "newChitose", ...AIRPORTS.newChitose },
    { id: "okadama", ...AIRPORTS.okadama }
  ],
  fukuoka: [{ id: "fukuoka", ...AIRPORTS.fukuoka }],
  okinawa: [{ id: "naha", ...AIRPORTS.naha }]
};

const citySearchNames: Record<CityPageSlug, string> = {
  osaka: "Osaka, Japan",
  hokkaido: "Sapporo, Hokkaido, Japan",
  fukuoka: "Fukuoka, Japan",
  okinawa: "Okinawa, Japan"
};

const basics: Record<Locale, Record<CityPageSlug, LocalizedCityBasics>> = {
  en: {
    osaka: {
      cityName: "Osaka",
      airportPhrase: "Kansai International Airport and Osaka Itami Airport",
      areaPhrase: "Osaka hotels, Namba, Umeda, Kyoto, Kobe, and Universal Studios Japan",
      dayTripPhrase: "Kyoto, Nara, Kobe, and Kansai day trips",
      hotelExample: "Namba hotel",
      imageAlt: "Osaka airport transfer private car"
    },
    hokkaido: {
      cityName: "Hokkaido",
      airportPhrase: "New Chitose Airport and Sapporo Okadama Airport",
      areaPhrase: "Sapporo hotels, Otaru, Niseko, Furano, and Hokkaido ski resorts",
      dayTripPhrase: "Otaru, Niseko, Furano, and Hokkaido day trips",
      hotelExample: "Sapporo hotel",
      imageAlt: "Hokkaido airport transfer private car"
    },
    fukuoka: {
      cityName: "Fukuoka",
      airportPhrase: "Fukuoka Airport",
      areaPhrase: "Hakata, Tenjin, Fukuoka hotels, cruise terminals, and nearby Kyushu destinations",
      dayTripPhrase: "Dazaifu, Itoshima, Beppu, and Kyushu day trips",
      hotelExample: "Hakata hotel",
      imageAlt: "Fukuoka airport transfer private car"
    },
    okinawa: {
      cityName: "Okinawa",
      airportPhrase: "Naha Airport",
      areaPhrase: "Naha, Kokusai-dori, Chatan, Onna Village, resort hotels, and Okinawa beaches",
      dayTripPhrase: "Churaumi Aquarium, Cape Manzamo, and Okinawa island day trips",
      hotelExample: "Naha hotel",
      imageAlt: "Okinawa airport transfer private car"
    }
  },
  ja: {
    osaka: {
      cityName: "大阪",
      airportPhrase: "関西国際空港・大阪伊丹空港",
      areaPhrase: "大阪ホテル、難波、梅田、京都、神戸、ユニバーサル・スタジオ・ジャパン",
      dayTripPhrase: "京都、奈良、神戸、関西の日帰り観光",
      hotelExample: "難波のホテル",
      imageAlt: "大阪空港送迎のプライベート車両"
    },
    hokkaido: {
      cityName: "北海道",
      airportPhrase: "新千歳空港・札幌丘珠空港",
      areaPhrase: "札幌ホテル、小樽、ニセコ、富良野、北海道スキーリゾート",
      dayTripPhrase: "小樽、ニセコ、富良野、北海道の日帰り観光",
      hotelExample: "札幌のホテル",
      imageAlt: "北海道空港送迎のプライベート車両"
    },
    fukuoka: {
      cityName: "福岡",
      airportPhrase: "福岡空港",
      areaPhrase: "博多、天神、福岡ホテル、クルーズターミナル、九州近郊エリア",
      dayTripPhrase: "太宰府、糸島、別府、九州の日帰り観光",
      hotelExample: "博多のホテル",
      imageAlt: "福岡空港送迎のプライベート車両"
    },
    okinawa: {
      cityName: "沖縄",
      airportPhrase: "那覇空港",
      areaPhrase: "那覇、国際通り、北谷、恩納村、リゾートホテル、沖縄ビーチエリア",
      dayTripPhrase: "美ら海水族館、万座毛、沖縄本島の日帰り観光",
      hotelExample: "那覇のホテル",
      imageAlt: "沖縄空港送迎のプライベート車両"
    }
  },
  zh: {
    osaka: {
      cityName: "大阪",
      airportPhrase: "關西國際機場和大阪伊丹機場",
      areaPhrase: "大阪酒店、難波、梅田、京都、神戶和日本環球影城",
      dayTripPhrase: "京都、奈良、神戶和關西一日遊",
      hotelExample: "難波酒店",
      imageAlt: "大阪機場接送私人專車"
    },
    hokkaido: {
      cityName: "北海道",
      airportPhrase: "新千歲機場和札幌丘珠機場",
      areaPhrase: "札幌酒店、小樽、二世谷、富良野和北海道滑雪度假村",
      dayTripPhrase: "小樽、二世谷、富良野和北海道一日遊",
      hotelExample: "札幌酒店",
      imageAlt: "北海道機場接送私人專車"
    },
    fukuoka: {
      cityName: "福岡",
      airportPhrase: "福岡機場",
      areaPhrase: "博多、天神、福岡酒店、郵輪碼頭和九州周邊目的地",
      dayTripPhrase: "太宰府、糸島、別府和九州一日遊",
      hotelExample: "博多酒店",
      imageAlt: "福岡機場接送私人專車"
    },
    okinawa: {
      cityName: "沖繩",
      airportPhrase: "那霸機場",
      areaPhrase: "那霸、國際通、北谷、恩納村、度假酒店和沖繩海灘區域",
      dayTripPhrase: "美麗海水族館、萬座毛和沖繩本島一日遊",
      hotelExample: "那霸酒店",
      imageAlt: "沖繩機場接送私人專車"
    }
  }
};

const seoProfiles: Record<Locale, Record<CityPageSlug, CitySeoProfile>> = {
  en: {
    osaka: {
      metaTitle: "Osaka Airport Transfer | Kansai Airport to Osaka, Kyoto & USJ",
      metaDescription:
        "Private Osaka airport transfer from Kansai or Itami to Namba, Umeda, Kyoto, Nara, Kobe and Universal Studios Japan. English driver, fixed quote, WhatsApp booking.",
      keywords: [
        "Kansai Airport to Osaka transfer",
        "Kansai Airport to Kyoto private transfer",
        "Osaka airport transfer English driver",
        "Osaka hotel transfer",
        "Osaka to Universal Studios Japan transfer",
        "Itami Airport transfer",
        "Osaka to Nara private car",
        "Osaka to Kobe private driver"
      ],
      routesTitle: "Osaka Airport Transfer Routes",
      routesSubtitle:
        "Private transfers for Kansai Airport, Itami Airport, Osaka hotels, Kyoto, Nara, Kobe, and Universal Studios Japan.",
      routes: [
        {
          title: "Kansai Airport to Osaka Namba",
          description:
            "Door-to-door KIX transfer for Namba, Dotonbori, Shinsaibashi, central Osaka hotels, families, and late-night arrivals.",
          href: "/kansai-airport-to-osaka-namba"
        },
        {
          title: "Kansai Airport to Kyoto",
          description:
            "Private long-distance transfer for travelers going directly from Kansai Airport to Kyoto hotels, ryokan, Gion, or Kawaramachi.",
          href: "/kansai-airport-to-kyoto"
        },
        {
          title: "Osaka hotel to Universal Studios Japan",
          description:
            "Easy private car service for USJ, luggage, children, and hotel-to-hotel movement around Osaka Bay."
        },
        {
          title: "Itami Airport to Osaka, Kyoto, or Kobe",
          description:
            "Fast private transfer from Osaka Itami Airport for domestic flights, business trips, and Kansai sightseeing."
        },
        {
          title: "Osaka to Kobe, Himeji, or Kansai day charter",
          description:
            "Flexible private driver service for day trips, shopping, sightseeing, and multi-stop travel."
        }
      ],
      faqTitle: "Osaka Airport Transfer FAQ",
      faqSubtitle: "Common questions for Kansai Airport, Itami Airport, Osaka hotels, Kyoto, USJ, and Kansai day trips.",
      faqs: [
        {
          question: "Do you cover both Kansai Airport and Itami Airport?",
          answer:
            "Yes. We can arrange private pickup and drop-off for Kansai International Airport, Osaka Itami Airport, Osaka hotels, Kyoto, Nara, Kobe, and Universal Studios Japan."
        },
        {
          question: "Can I go directly from Kansai Airport to Kyoto?",
          answer:
            "Yes. Kansai Airport to Kyoto is one of the most common long-distance private transfer routes, especially for families and travelers with luggage."
        },
        {
          question: "Can I book an English-speaking driver in Osaka?",
          answer:
            "Yes. Please mention English driver support when you send your route, pickup time, passenger count, and luggage details on WhatsApp."
        },
        {
          question: "Can you arrange Osaka hotel transfers and USJ pickup?",
          answer:
            "Yes. Hotel-to-hotel transfers, Universal Studios Japan pickup, station pickup, and Kansai day charters can be arranged."
        }
      ]
    },
    hokkaido: {
      metaTitle: "Hokkaido Airport Transfer | New Chitose to Sapporo & Niseko",
      metaDescription:
        "Private Hokkaido airport transfer from New Chitose to Sapporo, Niseko, Otaru, Furano, Biei, Noboribetsu and Lake Toya. English driver, ski luggage support.",
      keywords: [
        "New Chitose Airport transfer",
        "New Chitose to Sapporo private transfer",
        "New Chitose to Niseko transfer",
        "Hokkaido ski resort transfer",
        "Sapporo airport transfer English driver",
        "Hokkaido private driver",
        "Sapporo to Otaru day trip",
        "Furano Biei private car"
      ],
      routesTitle: "Hokkaido Airport Transfer Routes",
      routesSubtitle:
        "Private transfers for New Chitose Airport, Sapporo, Niseko ski resorts, Otaru, Furano, Biei, Noboribetsu, and Lake Toya.",
      routes: [
        {
          title: "New Chitose Airport to Sapporo hotels",
          description:
            "Comfortable airport transfer to central Sapporo, Susukino, Odori, and hotel areas after a long flight."
        },
        {
          title: "New Chitose Airport to Niseko ski resorts",
          description:
            "Private ski transfer for Hirafu, Hanazono, Niseko Village, ski bags, snowboards, and family luggage."
        },
        {
          title: "Sapporo to Otaru, Furano, or Biei",
          description:
            "Flexible day-trip private driver service for sightseeing, winter travel, lavender season, and photo stops."
        },
        {
          title: "New Chitose to Noboribetsu or Lake Toya",
          description:
            "Direct transfer to hot-spring hotels, resorts, and multi-stop Hokkaido itineraries."
        },
        {
          title: "Sapporo Okadama Airport pickup",
          description:
            "Short private transfer from Okadama Airport to Sapporo hotels or nearby Hokkaido destinations."
        }
      ],
      faqTitle: "Hokkaido Airport Transfer FAQ",
      faqSubtitle: "Common questions for New Chitose Airport, Sapporo, Niseko, ski luggage, and Hokkaido sightseeing routes.",
      faqs: [
        {
          question: "Can you pick up from New Chitose Airport?",
          answer:
            "Yes. We can arrange private transfer from New Chitose Airport to Sapporo, Niseko, Otaru, Furano, Biei, Noboribetsu, Lake Toya, and other Hokkaido destinations."
        },
        {
          question: "Can the vehicle carry ski bags and snowboards?",
          answer:
            "Yes. Please tell us the number of passengers, suitcases, ski bags, snowboards, and child seats so we can suggest Alphard or Hiace."
        },
        {
          question: "Can I book a Niseko ski resort transfer?",
          answer:
            "Yes. New Chitose to Niseko, Hirafu, Hanazono, and Niseko Village private transfers can be arranged."
        },
        {
          question: "Do you provide Hokkaido day trips?",
          answer:
            "Yes. Sapporo to Otaru, Furano, Biei, Noboribetsu, Lake Toya, and multi-stop sightseeing routes are available."
        }
      ]
    },
    fukuoka: {
      metaTitle: "Fukuoka Airport Transfer | Hakata, Tenjin, Cruise & Kyushu",
      metaDescription:
        "Private Fukuoka airport transfer to Hakata, Tenjin, Fukuoka cruise terminal, Dazaifu, Itoshima, Yufuin, Beppu and Kyushu routes. English driver and WhatsApp quote.",
      keywords: [
        "Fukuoka Airport transfer",
        "Fukuoka Airport to Hakata transfer",
        "Fukuoka Airport to Tenjin private car",
        "Fukuoka cruise terminal transfer",
        "Fukuoka English driver",
        "Fukuoka private driver",
        "Fukuoka to Dazaifu transfer",
        "Fukuoka to Beppu Yufuin private car"
      ],
      routesTitle: "Fukuoka Airport Transfer Routes",
      routesSubtitle:
        "Private transfers for Fukuoka Airport, Hakata, Tenjin, cruise terminals, Dazaifu, Itoshima, Beppu, Yufuin, and Kyushu day trips.",
      routes: [
        {
          title: "Fukuoka Airport to Hakata",
          description:
            "Short private transfer from FUK to Hakata Station hotels, Nakasu, Tenjin, business areas, and restaurants.",
          href: "/fukuoka-airport-to-hakata"
        },
        {
          title: "Fukuoka Airport to cruise terminal",
          description:
            "Convenient transfer for cruise passengers with luggage between Fukuoka Airport, Hakata Port, and hotels."
        },
        {
          title: "Fukuoka to Dazaifu or Itoshima",
          description:
            "Private driver service for popular short day trips, shrine visits, beaches, cafes, and flexible sightseeing."
        },
        {
          title: "Fukuoka to Yufuin or Beppu",
          description:
            "Comfortable long-distance transfer to onsen towns, ryokan, and Kyushu resort areas."
        },
        {
          title: "Fukuoka to Kumamoto or Nagasaki",
          description:
            "Flexible private car charter for Kyushu day trips and multi-city travel."
        }
      ],
      faqTitle: "Fukuoka Airport Transfer FAQ",
      faqSubtitle: "Common questions for Fukuoka Airport, Hakata, Tenjin, cruise terminal pickup, and Kyushu private driver routes.",
      faqs: [
        {
          question: "Is Fukuoka Airport close to the city?",
          answer:
            "Yes. Fukuoka Airport is close to Hakata and Tenjin, but a private car is helpful for luggage, family travel, late arrivals, and hotel-to-hotel movement."
        },
        {
          question: "Can you pick up from Hakata Port or the cruise terminal?",
          answer:
            "Yes. We can arrange airport, hotel, Hakata Port, and Fukuoka cruise terminal pickup or drop-off."
        },
        {
          question: "Can I book a Kyushu day trip from Fukuoka?",
          answer:
            "Yes. Dazaifu, Itoshima, Yufuin, Beppu, Kumamoto, Nagasaki, and other Kyushu routes can be arranged."
        },
        {
          question: "Can I request an English-speaking driver?",
          answer:
            "Yes. Please mention English driver support when sending your trip details on WhatsApp."
        }
      ]
    },
    okinawa: {
      metaTitle: "Okinawa Airport Transfer | Naha to Onna Resorts & Churaumi",
      metaDescription:
        "Private Okinawa airport transfer from Naha Airport to Naha, Chatan, American Village, Onna Village resorts, Motobu and Churaumi Aquarium. English driver, family friendly.",
      keywords: [
        "Naha Airport transfer",
        "Okinawa airport transfer",
        "Naha Airport to Onna Village transfer",
        "Naha Airport to Chatan transfer",
        "Okinawa resort hotel transfer",
        "Okinawa English driver",
        "Okinawa private driver",
        "Churaumi Aquarium private car"
      ],
      routesTitle: "Okinawa Airport Transfer Routes",
      routesSubtitle:
        "Private transfers for Naha Airport, Naha hotels, Kokusai-dori, Chatan, American Village, Onna Village resorts, Motobu, and Churaumi Aquarium.",
      routes: [
        {
          title: "Naha Airport to Naha or Kokusai-dori",
          description:
            "Short private airport pickup for Naha hotels, shopping areas, restaurants, and late-night arrivals."
        },
        {
          title: "Naha Airport to Chatan or American Village",
          description:
            "Comfortable transfer for families, beach stays, shopping, and hotel areas on Okinawa's central coast."
        },
        {
          title: "Naha Airport to Onna Village resort hotels",
          description:
            "Private transfer to resort hotels, beach areas, golf resorts, and family-friendly stays in northern Okinawa.",
          href: "/naha-airport-to-onna-village"
        },
        {
          title: "Okinawa Churaumi Aquarium and Motobu day trip",
          description:
            "Flexible private driver service for Churaumi Aquarium, Motobu, Cape Manzamo, beaches, and scenic stops."
        },
        {
          title: "Okinawa hotel-to-hotel transfer",
          description:
            "Private movement between Naha, Chatan, Onna, Motobu, and resort hotels with luggage support."
        }
      ],
      faqTitle: "Okinawa Airport Transfer FAQ",
      faqSubtitle: "Common questions for Naha Airport pickup, resort hotels, Chatan, Onna Village, Motobu, and Churaumi Aquarium.",
      faqs: [
        {
          question: "Can you transfer from Naha Airport to Onna Village resorts?",
          answer:
            "Yes. Naha Airport to Onna Village, Chatan, American Village, Motobu, and resort hotels can be arranged."
        },
        {
          question: "Can I book an Okinawa sightseeing day trip?",
          answer:
            "Yes. Churaumi Aquarium, Cape Manzamo, Motobu, beach areas, and hotel-to-hotel sightseeing routes are available."
        },
        {
          question: "Is the service suitable for families with luggage?",
          answer:
            "Yes. Please share passenger count, suitcase count, stroller needs, and child seat requests so we can suggest the right vehicle."
        },
        {
          question: "Can I request an English-speaking driver in Okinawa?",
          answer:
            "Yes. English driver support can be requested when you send your booking details on WhatsApp."
        }
      ]
    }
  },
  ja: {
    osaka: {
      metaTitle: "大阪空港送迎 | 関西空港から大阪・京都・USJへ",
      metaDescription:
        "関西空港・伊丹空港から難波、梅田、京都、奈良、神戸、USJまでの大阪プライベート送迎。固定料金、英語対応ドライバー、WhatsApp見積もり。",
      keywords: [
        "関西空港 大阪 送迎",
        "関西空港 京都 送迎",
        "大阪空港送迎 英語ドライバー",
        "大阪 ホテル送迎",
        "大阪 USJ 送迎",
        "伊丹空港 送迎",
        "大阪 奈良 ハイヤー",
        "大阪 神戸 プライベートドライバー"
      ],
      routesTitle: "大阪の空港送迎ルート",
      routesSubtitle:
        "関西空港、伊丹空港、大阪ホテル、京都、奈良、神戸、USJに対応するプライベート送迎です。",
      routes: [
        {
          title: "関西空港から大阪難波へ",
          description: "難波、道頓堀、心斎橋、大阪中心部ホテル、深夜到着、家族旅行に便利なドアツードア送迎です。",
          href: "/kansai-airport-to-osaka-namba"
        },
        {
          title: "関西空港から京都へ",
          description: "関西空港から京都ホテル、旅館、祇園、河原町へ直接向かう長距離プライベート送迎です。",
          href: "/kansai-airport-to-kyoto"
        },
        {
          title: "大阪ホテルからUSJへ",
          description: "ユニバーサル・スタジオ・ジャパン、荷物、お子様連れ、ベイエリア移動に便利です。"
        },
        {
          title: "伊丹空港から大阪・京都・神戸へ",
          description: "国内線利用、ビジネス、関西観光に使いやすい伊丹空港送迎です。"
        },
        {
          title: "大阪から神戸・姫路・関西日帰り",
          description: "観光、買い物、複数立ち寄りに対応する時間貸切プライベートドライバーです。"
        }
      ],
      faqTitle: "大阪空港送迎 FAQ",
      faqSubtitle: "関西空港、伊丹空港、大阪ホテル、京都、USJ、関西日帰り観光のよくある質問です。",
      faqs: [
        {
          question: "関西空港と伊丹空港の両方に対応していますか？",
          answer: "はい。関西国際空港、大阪伊丹空港、大阪ホテル、京都、奈良、神戸、USJへの送迎に対応しています。"
        },
        {
          question: "関西空港から京都へ直接行けますか？",
          answer: "はい。荷物が多いご家族や長距離移動の方に、関西空港から京都への専用車送迎はよく利用されています。"
        },
        {
          question: "大阪で英語対応ドライバーを予約できますか？",
          answer: "はい。WhatsAppでルート、時間、人数、荷物数を送る際に英語対応希望とお知らせください。"
        },
        {
          question: "ホテル間移動やUSJ送迎もできますか？",
          answer: "はい。ホテル間移動、USJ送迎、駅送迎、関西日帰りチャーターも相談できます。"
        }
      ]
    },
    hokkaido: {
      metaTitle: "北海道空港送迎 | 新千歳空港から札幌・ニセコへ",
      metaDescription:
        "新千歳空港から札幌、ニセコ、小樽、富良野、美瑛、登別、洞爺湖への北海道プライベート送迎。英語対応、スキー荷物も相談可能。",
      keywords: [
        "新千歳空港 送迎",
        "新千歳空港 札幌 送迎",
        "新千歳空港 ニセコ 送迎",
        "北海道 スキーリゾート 送迎",
        "札幌 空港送迎 英語ドライバー",
        "北海道 プライベートドライバー",
        "札幌 小樽 日帰り",
        "富良野 美瑛 ハイヤー"
      ],
      routesTitle: "北海道の空港送迎ルート",
      routesSubtitle:
        "新千歳空港、札幌、ニセコ、小樽、富良野、美瑛、登別、洞爺湖に対応するプライベート送迎です。",
      routes: [
        {
          title: "新千歳空港から札幌ホテルへ",
          description: "札幌中心部、すすきの、大通、ホテルエリアまで快適に移動できます。"
        },
        {
          title: "新千歳空港からニセコスキーリゾートへ",
          description: "ヒラフ、花園、ニセコビレッジ、スキー板、スノーボード、家族旅行の荷物に対応します。"
        },
        {
          title: "札幌から小樽・富良野・美瑛へ",
          description: "冬の観光、ラベンダーシーズン、写真スポット巡りに使いやすい日帰り専用車です。"
        },
        {
          title: "新千歳空港から登別・洞爺湖へ",
          description: "温泉ホテル、リゾート、北海道周遊ルートへの直接送迎に対応します。"
        },
        {
          title: "札幌丘珠空港から札幌市内へ",
          description: "丘珠空港から札幌ホテルや近郊目的地への短距離送迎です。"
        }
      ],
      faqTitle: "北海道空港送迎 FAQ",
      faqSubtitle: "新千歳空港、札幌、ニセコ、スキー荷物、北海道観光ルートのよくある質問です。",
      faqs: [
        {
          question: "新千歳空港から送迎できますか？",
          answer: "はい。新千歳空港から札幌、ニセコ、小樽、富良野、美瑛、登別、洞爺湖などへ送迎できます。"
        },
        {
          question: "スキー板やスノーボードを積めますか？",
          answer: "はい。人数、スーツケース、スキー用品、チャイルドシートの有無を送っていただければ車種を提案します。"
        },
        {
          question: "ニセコのスキーリゾート送迎はできますか？",
          answer: "はい。新千歳空港からニセコ、ヒラフ、花園、ニセコビレッジまでの専用車送迎を手配できます。"
        },
        {
          question: "北海道の日帰り観光もできますか？",
          answer: "はい。札幌から小樽、富良野、美瑛、登別、洞爺湖など複数立ち寄りルートも相談できます。"
        }
      ]
    },
    fukuoka: {
      metaTitle: "福岡空港送迎 | 博多・天神・クルーズ・九州観光",
      metaDescription:
        "福岡空港から博多、天神、福岡クルーズターミナル、太宰府、糸島、由布院、別府、九州各地への専用車送迎。英語対応可能。",
      keywords: [
        "福岡空港 送迎",
        "福岡空港 博多 送迎",
        "福岡空港 天神 ハイヤー",
        "福岡 クルーズターミナル 送迎",
        "福岡 英語ドライバー",
        "福岡 プライベートドライバー",
        "福岡 太宰府 送迎",
        "福岡 別府 由布院 ハイヤー"
      ],
      routesTitle: "福岡の空港送迎ルート",
      routesSubtitle:
        "福岡空港、博多、天神、クルーズターミナル、太宰府、糸島、別府、由布院、九州日帰り観光に対応します。",
      routes: [
        {
          title: "福岡空港から博多へ",
          description: "博多駅ホテル、中洲、天神、福岡中心部への短距離送迎です。",
          href: "/fukuoka-airport-to-hakata"
        },
        {
          title: "福岡空港からクルーズターミナルへ",
          description: "空港、ホテル、博多港、福岡クルーズターミナル間の荷物付き移動に便利です。"
        },
        {
          title: "福岡から太宰府・糸島へ",
          description: "神社、海沿いカフェ、観光スポットを回る短時間の日帰り専用車です。"
        },
        {
          title: "福岡から由布院・別府へ",
          description: "温泉地、旅館、九州リゾートエリアへの長距離送迎に対応します。"
        },
        {
          title: "福岡から熊本・長崎へ",
          description: "九州の日帰り観光や複数都市移動に使える時間貸切チャーターです。"
        }
      ],
      faqTitle: "福岡空港送迎 FAQ",
      faqSubtitle: "福岡空港、博多、天神、クルーズ送迎、九州プライベートドライバーのよくある質問です。",
      faqs: [
        {
          question: "福岡空港は市内に近いですか？",
          answer: "はい。博多や天神に近いですが、荷物が多い場合、家族旅行、深夜到着、ホテル間移動では専用車が便利です。"
        },
        {
          question: "博多港やクルーズターミナルで迎えられますか？",
          answer: "はい。空港、ホテル、博多港、福岡クルーズターミナルの送迎に対応できます。"
        },
        {
          question: "福岡発の九州日帰り観光はできますか？",
          answer: "はい。太宰府、糸島、由布院、別府、熊本、長崎などのルートを相談できます。"
        },
        {
          question: "英語対応ドライバーを希望できますか？",
          answer: "はい。WhatsAppで行程を送る際に英語対応希望とお知らせください。"
        }
      ]
    },
    okinawa: {
      metaTitle: "沖縄空港送迎 | 那覇空港から恩納村・美ら海水族館へ",
      metaDescription:
        "那覇空港から那覇、国際通り、北谷、アメリカンビレッジ、恩納村リゾート、本部、美ら海水族館への沖縄専用車送迎。英語対応可能。",
      keywords: [
        "那覇空港 送迎",
        "沖縄 空港送迎",
        "那覇空港 恩納村 送迎",
        "那覇空港 北谷 送迎",
        "沖縄 リゾートホテル 送迎",
        "沖縄 英語ドライバー",
        "沖縄 プライベートドライバー",
        "美ら海水族館 ハイヤー"
      ],
      routesTitle: "沖縄の空港送迎ルート",
      routesSubtitle:
        "那覇空港、那覇ホテル、国際通り、北谷、アメリカンビレッジ、恩納村リゾート、本部、美ら海水族館に対応します。",
      routes: [
        {
          title: "那覇空港から那覇・国際通りへ",
          description: "那覇ホテル、買い物、食事エリア、深夜到着に便利な短距離送迎です。"
        },
        {
          title: "那覇空港から北谷・アメリカンビレッジへ",
          description: "沖縄中部のホテル、ビーチ、ショッピング、家族旅行に使いやすい送迎です。"
        },
        {
          title: "那覇空港から恩納村リゾートホテルへ",
          description: "北部リゾートホテル、ビーチ、ゴルフ、家族旅行に便利なプライベート送迎です。",
          href: "/naha-airport-to-onna-village"
        },
        {
          title: "美ら海水族館・本部の日帰り観光",
          description: "美ら海水族館、本部、万座毛、ビーチなどを巡る時間貸切ドライバーです。"
        },
        {
          title: "沖縄ホテル間移動",
          description: "那覇、北谷、恩納村、本部、リゾートホテル間の荷物付き移動に対応します。"
        }
      ],
      faqTitle: "沖縄空港送迎 FAQ",
      faqSubtitle: "那覇空港、リゾートホテル、北谷、恩納村、本部、美ら海水族館のよくある質問です。",
      faqs: [
        {
          question: "那覇空港から恩納村リゾートへ送迎できますか？",
          answer: "はい。那覇空港から恩納村、北谷、アメリカンビレッジ、本部、リゾートホテルまで手配できます。"
        },
        {
          question: "沖縄の日帰り観光も予約できますか？",
          answer: "はい。美ら海水族館、万座毛、本部、ビーチエリア、ホテル間観光ルートに対応できます。"
        },
        {
          question: "家族旅行や荷物が多い場合も大丈夫ですか？",
          answer: "はい。人数、スーツケース、ベビーカー、チャイルドシートの希望を送っていただければ車種を提案します。"
        },
        {
          question: "沖縄で英語対応ドライバーを希望できますか？",
          answer: "はい。WhatsAppで予約内容を送る際に英語対応希望とお知らせください。"
        }
      ]
    }
  },
  zh: {
    osaka: {
      metaTitle: "大阪機場接送 | 關西機場到大阪京都環球影城包車",
      metaDescription:
        "大阪機場接送，覆蓋關西機場、伊丹機場、難波、梅田、京都、奈良、神戶和日本環球影城。私人專車固定報價，可中文英文溝通。",
      keywords: [
        "關西機場到大阪接送",
        "關西機場到京都包車",
        "大阪機場接送英文司機",
        "大阪酒店接送",
        "大阪到環球影城接送",
        "伊丹機場接送",
        "大阪到奈良包車",
        "大阪到神戶包車"
      ],
      routesTitle: "大阪熱門機場接送路線",
      routesSubtitle: "覆蓋關西機場、伊丹機場、大阪酒店、京都、奈良、神戶和日本環球影城的私人專車接送。",
      routes: [
        {
          title: "關西機場到大阪難波",
          description: "適合難波、道頓堀、心齋橋、大阪市區酒店、親子家庭和深夜到達的點對點接送。",
          href: "/kansai-airport-to-osaka-namba"
        },
        {
          title: "關西機場到京都",
          description: "適合從關西機場直接前往京都酒店、旅館、祇園或河原町的長距離私人接送。",
          href: "/kansai-airport-to-kyoto"
        },
        {
          title: "大阪酒店到日本環球影城",
          description: "適合 USJ、日本環球影城、帶孩子和行李的酒店往返與大阪灣區域移動。"
        },
        {
          title: "伊丹機場到大阪、京都或神戶",
          description: "適合日本國內線抵達、大阪商務出行和關西觀光行程。"
        },
        {
          title: "大阪到神戶、姬路或關西一日遊",
          description: "適合購物、觀光、多點停留和時間包車。"
        }
      ],
      faqTitle: "大阪機場接送常見問題",
      faqSubtitle: "關於關西機場、伊丹機場、大阪酒店、京都、USJ 和關西一日遊的常見問題。",
      faqs: [
        {
          question: "關西機場和伊丹機場都可以接送嗎？",
          answer: "可以。我們可以安排關西國際機場、大阪伊丹機場、大阪酒店、京都、奈良、神戶和日本環球影城的私人接送。"
        },
        {
          question: "可以從關西機場直接去京都嗎？",
          answer: "可以。關西機場到京都是很常見的長距離接送路線，特別適合家庭和攜帶多件行李的旅客。"
        },
        {
          question: "大阪可以安排英文司機嗎？",
          answer: "可以。透過 WhatsApp 發送路線、時間、人數和行李數量時，請說明需要英文司機。"
        },
        {
          question: "可以安排大阪酒店移動和環球影城接送嗎？",
          answer: "可以。酒店到酒店移動、USJ 接送、車站接送和關西一日遊包車都可以安排。"
        }
      ]
    },
    hokkaido: {
      metaTitle: "北海道機場接送 | 新千歲機場到札幌二世谷滑雪包車",
      metaDescription:
        "北海道機場接送，覆蓋新千歲機場、札幌、二世谷、小樽、富良野、美瑛、登別和洞爺湖。私人專車固定報價，可載滑雪行李。",
      keywords: [
        "新千歲機場接送",
        "新千歲機場到札幌包車",
        "新千歲機場到二世谷接送",
        "北海道滑雪接送",
        "札幌機場接送英文司機",
        "北海道包車司機",
        "札幌到小樽一日遊",
        "富良野美瑛包車"
      ],
      routesTitle: "北海道熱門機場接送路線",
      routesSubtitle: "覆蓋新千歲機場、札幌、二世谷滑雪度假村、小樽、富良野、美瑛、登別和洞爺湖的私人接送。",
      routes: [
        {
          title: "新千歲機場到札幌酒店",
          description: "適合前往札幌市區、薄野、大通公園和酒店區域的舒適機場接送。"
        },
        {
          title: "新千歲機場到二世谷滑雪度假村",
          description: "適合 Hirafu、Hanazono、Niseko Village、滑雪板、雪具和家庭大件行李。"
        },
        {
          title: "札幌到小樽、富良野或美瑛",
          description: "適合冬季觀光、薰衣草季、拍照打卡和多點停留的一日遊包車。"
        },
        {
          title: "新千歲機場到登別或洞爺湖",
          description: "適合溫泉酒店、度假村和北海道多日周遊行程。"
        },
        {
          title: "札幌丘珠機場接送",
          description: "適合丘珠機場到札幌酒店或北海道近郊目的地的短途接送。"
        }
      ],
      faqTitle: "北海道機場接送常見問題",
      faqSubtitle: "關於新千歲機場、札幌、二世谷、滑雪行李和北海道觀光路線的常見問題。",
      faqs: [
        {
          question: "可以從新千歲機場接送嗎？",
          answer: "可以。可安排新千歲機場到札幌、二世谷、小樽、富良野、美瑛、登別、洞爺湖等北海道目的地。"
        },
        {
          question: "滑雪板和雪具可以放車上嗎？",
          answer: "可以。請提前告訴我們人數、行李箱、滑雪板、雪具和兒童座椅需求，我們會推薦合適車型。"
        },
        {
          question: "可以預約二世谷滑雪度假村接送嗎？",
          answer: "可以。新千歲機場到二世谷、Hirafu、Hanazono、Niseko Village 都可以安排私人專車。"
        },
        {
          question: "北海道一日遊也可以安排嗎？",
          answer: "可以。札幌到小樽、富良野、美瑛、登別、洞爺湖等多點觀光路線都可以諮詢。"
        }
      ]
    },
    fukuoka: {
      metaTitle: "福岡機場接送 | 福岡機場到博多天神郵輪九州包車",
      metaDescription:
        "福岡機場接送，覆蓋博多、天神、福岡郵輪碼頭、太宰府、糸島、由布院、別府和九州周邊。私人專車，可中文英文溝通。",
      keywords: [
        "福岡機場接送",
        "福岡機場到博多接送",
        "福岡機場到天神包車",
        "福岡郵輪碼頭接送",
        "福岡英文司機",
        "福岡包車司機",
        "福岡到太宰府包車",
        "福岡到別府由布院包車"
      ],
      routesTitle: "福岡熱門機場接送路線",
      routesSubtitle: "覆蓋福岡機場、博多、天神、郵輪碼頭、太宰府、糸島、別府、由布院和九州一日遊。",
      routes: [
        {
          title: "福岡機場到博多",
          description: "適合博多站酒店、中洲、天神和福岡市區的短途私人接送。",
          href: "/fukuoka-airport-to-hakata"
        },
        {
          title: "福岡機場到郵輪碼頭",
          description: "適合郵輪旅客在福岡機場、博多港、福岡郵輪碼頭和酒店之間攜帶行李移動。"
        },
        {
          title: "福岡到太宰府或糸島",
          description: "適合神社參拜、海邊咖啡、拍照景點和輕鬆一日遊包車。"
        },
        {
          title: "福岡到由布院或別府",
          description: "適合溫泉酒店、旅館和九州度假區域的長距離私人接送。"
        },
        {
          title: "福岡到熊本或長崎",
          description: "適合九州一日遊、多城市移動和時間包車。"
        }
      ],
      faqTitle: "福岡機場接送常見問題",
      faqSubtitle: "關於福岡機場、博多、天神、郵輪碼頭接送和九州包車路線的常見問題。",
      faqs: [
        {
          question: "福岡機場離市區近嗎？",
          answer: "福岡機場離博多和天神很近，但如果行李多、家庭出行、深夜到達或需要酒店移動，專車會更方便。"
        },
        {
          question: "可以在博多港或郵輪碼頭接送嗎？",
          answer: "可以。機場、酒店、博多港和福岡郵輪碼頭之間都可以安排接送。"
        },
        {
          question: "可以從福岡出發做九州一日遊嗎？",
          answer: "可以。太宰府、糸島、由布院、別府、熊本、長崎等路線都可以諮詢。"
        },
        {
          question: "可以安排英文司機嗎？",
          answer: "可以。透過 WhatsApp 發送行程時，請說明需要英文司機。"
        }
      ]
    },
    okinawa: {
      metaTitle: "沖繩機場接送 | 那霸機場到恩納村美麗海水族館包車",
      metaDescription:
        "沖繩機場接送，覆蓋那霸機場、國際通、北谷、美國村、恩納村度假酒店、本部和美麗海水族館。私人專車，適合家庭行李。",
      keywords: [
        "那霸機場接送",
        "沖繩機場接送",
        "那霸機場到恩納村接送",
        "那霸機場到北谷接送",
        "沖繩度假酒店接送",
        "沖繩英文司機",
        "沖繩包車司機",
        "美麗海水族館包車"
      ],
      routesTitle: "沖繩熱門機場接送路線",
      routesSubtitle: "覆蓋那霸機場、那霸酒店、國際通、北谷、美國村、恩納村度假酒店、本部和美麗海水族館。",
      routes: [
        {
          title: "那霸機場到那霸或國際通",
          description: "適合那霸市區酒店、購物美食區域和深夜到達的短途私人接送。"
        },
        {
          title: "那霸機場到北谷或美國村",
          description: "適合沖繩中部酒店、海灘、購物和親子家庭出行。"
        },
        {
          title: "那霸機場到恩納村度假酒店",
          description: "適合北部度假酒店、海灘、親子家庭和高爾夫行程。",
          href: "/naha-airport-to-onna-village"
        },
        {
          title: "美麗海水族館和本部一日遊",
          description: "可安排美麗海水族館、本部、萬座毛、海灘和沿途景點的包車。"
        },
        {
          title: "沖繩酒店到酒店移動",
          description: "適合那霸、北谷、恩納村、本部和度假酒店之間攜帶行李移動。"
        }
      ],
      faqTitle: "沖繩機場接送常見問題",
      faqSubtitle: "關於那霸機場、度假酒店、北谷、恩納村、本部和美麗海水族館的常見問題。",
      faqs: [
        {
          question: "可以從那霸機場到恩納村度假酒店嗎？",
          answer: "可以。那霸機場到恩納村、北谷、美國村、本部和度假酒店都可以安排。"
        },
        {
          question: "可以預約沖繩一日遊包車嗎？",
          answer: "可以。美麗海水族館、萬座毛、本部、海灘區域和酒店間觀光路線都可以安排。"
        },
        {
          question: "適合帶孩子和很多行李的家庭嗎？",
          answer: "適合。請提前告訴我們人數、行李箱、嬰兒車和兒童座椅需求，我們會推薦合適車型。"
        },
        {
          question: "沖繩可以安排英文司機嗎？",
          answer: "可以。透過 WhatsApp 發送預約資訊時，請說明需要英文司機。"
        }
      ]
    }
  }
};

function airportNames(locale: Locale, airports: CityAirport[]) {
  return airports.map((airport) => airport.name[locale] ?? airport.name.en).join(" / ");
}

function unique(items: string[]) {
  return [...new Set(items)];
}

function withCityHref(slug: CityPageSlug, routes: CitySeoRoute[]) {
  return routes.map((route) => ({
    ...route,
    href: route.href ?? cityPath(slug)
  }));
}

function buildEnglishContent(slug: CityPageSlug, basicsItem: LocalizedCityBasics): CityPageContent {
  const airports = cityAirports[slug];
  const city = basicsItem.cityName;
  const airportList = airportNames("en", airports);
  const seo = seoProfiles.en[slug];

  return {
    slug,
    path: cityPath(slug),
    cityName: city,
    citySearchName: citySearchNames[slug],
    routeAirports: airports,
    defaultAirportId: airports[0].id,
    meta: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: unique([
        `${city} airport transfer`,
        `${city} airport pickup`,
        `${city} private driver`,
        `${city} English driver`,
        `${city} hotel transfer`,
        `${city} day trip private car`,
        ...seo.keywords,
        ...airports.map((airport) => `${airport.name.en} transfer`)
      ]),
      image: "/images/tokyo-airport-transfer.jpg"
    },
    hero: {
      title: `${city} Airport Transfer`,
      subtitle: `Private transfer from ${basicsItem.airportPhrase} to ${basicsItem.areaPhrase}.`,
      features: [
        "24 hour airport transfer service",
        "English-speaking driver",
        "Hotel-to-hotel transfer",
        "Fixed transparent pricing",
        `${basicsItem.dayTripPhrase}`,
        "WhatsApp booking"
      ],
      imageSrc: "/images/tokyo-airport-transfer.jpg",
      imageAlt: basicsItem.imageAlt
    },
    quote: {
      title: `Book Your ${city} Transfer Now`,
      subtitle: `Search your hotel or address in ${city}, review the route estimate, then send the details on WhatsApp for a confirmed fixed quote.`,
      directNote:
        "Opens in WhatsApp after submission to chat directly with the driver. Optional name-sign meet-and-greet at the arrival gate: +¥2,000 when requested."
    },
    waiting: {
      pickupNote: "Waiting time starts from flight landing for airport pickup, or scheduled time for hotel pickup.",
      delayNote: "No worries about flight delays. The driver adjusts based on the actual landing time.",
      promiseTitle: "Our Service Promise",
      promises: [
        ["On-time Arrival", "Driver arrives early and waits at the agreed meeting point."],
        ["Transparent Pricing", "Fixed pricing with no hidden fees."],
        ["English Driver", "Professional English-speaking driver for smooth communication."],
        ["Flexible Routes", "Airport, hotel, station, and day-trip routes can be arranged."]
      ]
    },
    booking: {
      title: `Book Your ${city} Transfer`,
      subtitle: "Send your flight, pickup time, hotel, passenger count, and luggage details to get a fast quote on WhatsApp.",
      placeholders: {
        airport: airportList,
        flight: "JL123",
        landingTime: "May 3, 4:30 PM",
        hotel: basicsItem.hotelExample,
        passengers: "2",
        luggage: "3 suitcases"
      },
      messageHeader: `Hello, I need a ${city} airport transfer quote.`
    },
    seo: {
      routesTitle: seo.routesTitle,
      routesSubtitle: seo.routesSubtitle,
      routes: withCityHref(slug, seo.routes),
      faqTitle: seo.faqTitle,
      faqSubtitle: seo.faqSubtitle,
      faqs: seo.faqs
    }
  };
}

function buildJapaneseContent(slug: CityPageSlug, basicsItem: LocalizedCityBasics): CityPageContent {
  const airports = cityAirports[slug];
  const city = basicsItem.cityName;
  const airportList = airportNames("ja", airports);
  const seo = seoProfiles.ja[slug];

  return {
    slug,
    path: cityPath(slug),
    cityName: city,
    citySearchName: citySearchNames[slug],
    routeAirports: airports,
    defaultAirportId: airports[0].id,
    meta: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: unique([
        `${city} 空港送迎`,
        `${city} 空港ピックアップ`,
        `${city} プライベートドライバー`,
        `${city} 英語ドライバー`,
        `${city} ホテル送迎`,
        `${city} 日帰り チャーター`,
        ...seo.keywords,
        ...airports.map((airport) => `${airport.name.ja} 送迎`)
      ]),
      image: "/images/tokyo-airport-transfer.jpg"
    },
    hero: {
      title: `${city}空港送迎`,
      subtitle: `${basicsItem.airportPhrase}から${basicsItem.areaPhrase}までのプライベート送迎。`,
      features: [
        "24時間空港送迎",
        "英語対応ドライバー",
        "ホテル間移動",
        "明朗な固定料金",
        basicsItem.dayTripPhrase,
        "WhatsAppで予約"
      ],
      imageSrc: "/images/tokyo-airport-transfer.jpg",
      imageAlt: basicsItem.imageAlt
    },
    quote: {
      title: `${city}送迎を今すぐ予約`,
      subtitle: `${city}のホテル名や住所を検索し、ルート目安を確認してからWhatsAppで固定料金を相談できます。`,
      directNote:
        "送信後、WhatsAppでドライバーと直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。"
    },
    waiting: {
      pickupNote: "空港お迎えは実際のフライト到着時刻から、ホテルお迎えは予約時刻から待機時間を計算します。",
      delayNote: "フライト遅延時も到着時刻に合わせてドライバーが調整します。",
      promiseTitle: "サービスのお約束",
      promises: [
        ["時間厳守", "ドライバーが早めに到着し、指定場所でお待ちします。"],
        ["明朗料金", "固定料金で、隠れた追加費用はありません。"],
        ["英語対応", "英語対応ドライバーでスムーズに連絡できます。"],
        ["柔軟なルート", "空港、ホテル、駅、日帰り観光に対応できます。"]
      ]
    },
    booking: {
      title: `${city}送迎を予約`,
      subtitle: "フライト、到着時刻、ホテル、ご利用人数、荷物情報を送ると、WhatsAppですぐに見積もりできます。",
      placeholders: {
        airport: airportList,
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: basicsItem.hotelExample,
        passengers: "2名",
        luggage: "スーツケース3個"
      },
      messageHeader: `こんにちは。${city}空港送迎の見積もりをお願いします。`
    },
    seo: {
      routesTitle: seo.routesTitle,
      routesSubtitle: seo.routesSubtitle,
      routes: withCityHref(slug, seo.routes),
      faqTitle: seo.faqTitle,
      faqSubtitle: seo.faqSubtitle,
      faqs: seo.faqs
    }
  };
}

function buildChineseContent(slug: CityPageSlug, basicsItem: LocalizedCityBasics): CityPageContent {
  const airports = cityAirports[slug];
  const city = basicsItem.cityName;
  const airportList = airportNames("zh", airports);
  const seo = seoProfiles.zh[slug];

  return {
    slug,
    path: cityPath(slug),
    cityName: city,
    citySearchName: citySearchNames[slug],
    routeAirports: airports,
    defaultAirportId: airports[0].id,
    meta: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: unique([
        `${city}機場接送`,
        `${city}接機`,
        `${city}包車`,
        `${city}英文司機`,
        `${city}酒店移動`,
        `${city}酒店接送`,
        `${city}一日遊包車`,
        ...seo.keywords,
        ...airports.map((airport) => `${airport.name.zh}接送`)
      ]),
      image: "/images/tokyo-airport-transfer.jpg"
    },
    hero: {
      title: `${city}機場接送`,
      subtitle: `${basicsItem.airportPhrase}到${basicsItem.areaPhrase}的私人專車接送服務。`,
      features: [
        "24小時機場接送",
        "可中文和英文溝通",
        "酒店到酒店移動",
        "固定報價，價格透明",
        basicsItem.dayTripPhrase,
        "WhatsApp 快速預約"
      ],
      imageSrc: "/images/tokyo-airport-transfer.jpg",
      imageAlt: basicsItem.imageAlt
    },
    quote: {
      title: `立即預約${city}接送服務`,
      subtitle: `搜尋${city}酒店或地址，查看路線參考價格，再透過 WhatsApp 獲取最終固定報價。`,
      directNote:
        "提交後會打開 WhatsApp，方便直接和司機溝通。到達口舉牌接機為可選服務，需要時另加 2,000 日元。"
    },
    waiting: {
      pickupNote: "接機等待時間從航班實際落地算起，酒店接送從預約時間算起。",
      delayNote: "航班延誤不用擔心，司機會根據實際落地時間調整接機。",
      promiseTitle: "我們的服務承諾",
      promises: [
        ["準時到達", "司機會提前到達，在約定地點等待。"],
        ["價格透明", "固定報價，無隱藏費用。"],
        ["英文司機", "專業英文司機，溝通順暢。"],
        ["路線靈活", "機場、酒店、車站和一日遊都可以安排。"]
      ]
    },
    booking: {
      title: `預約${city}接送`,
      subtitle: "發送航班、落地時間、酒店、乘客人數和行李資訊，我們會透過 WhatsApp 快速報價。",
      placeholders: {
        airport: airportList,
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: basicsItem.hotelExample,
        passengers: "2人",
        luggage: "3個行李箱"
      },
      messageHeader: `您好，我需要${city}機場接送報價。`
    },
    seo: {
      routesTitle: seo.routesTitle,
      routesSubtitle: seo.routesSubtitle,
      routes: withCityHref(slug, seo.routes),
      faqTitle: seo.faqTitle,
      faqSubtitle: seo.faqSubtitle,
      faqs: seo.faqs
    }
  };
}

export function getCityPageContent(locale: Locale, slug: CityPageSlug): CityPageContent {
  const localeBasics = basics[locale] ?? basics.en;
  const basicsItem = localeBasics[slug];

  if (locale === "ja") return buildJapaneseContent(slug, basicsItem);
  if (locale === "zh") return buildChineseContent(slug, basicsItem);

  return buildEnglishContent(slug, basicsItem);
}
