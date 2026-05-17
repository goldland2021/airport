import type { Locale } from "./i18n";

export type SeoRoute = {
  title: string;
  description: string;
  href: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

type HomeSeoContent = {
  routesTitle: string;
  routesSubtitle: string;
  routes: SeoRoute[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: SeoFaq[];
};

type AirportGuideContent = {
  title: string;
  subtitle: string;
  destinationsTitle: string;
  destinations: { name: string; description: string }[];
  tipsTitle: string;
  tips: string[];
};

export const homeSeoContent: Record<Locale, HomeSeoContent> = {
  en: {
    routesTitle: "Popular Tokyo Airport Transfer Routes",
    routesSubtitle:
      "Private airport pickup, Tokyo hotel transfers, Shinkansen station pickup, and Mt Fuji day trips for hotels, homes, apartments, and family travel. Quotes are based on route distance, vehicle size, luggage, and arrival time.",
    routes: [
      {
        title: "Narita Airport to Tokyo hotels",
        description:
          "Door-to-door Narita Airport transfer to Shinjuku, Shibuya, Ginza, Asakusa, Shinagawa, and other central Tokyo areas.",
        href: "/narita-airport-transfer"
      },
      {
        title: "Haneda Airport to central Tokyo",
        description:
          "Fast Haneda Airport pickup for Ginza, Tsukiji, Shinagawa, Shinjuku, Shibuya, and Tokyo cruise terminals.",
        href: "/haneda-airport-transfer"
      },
      {
        title: "Tokyo hotel to Narita or Haneda",
        description:
          "Reliable airport drop-off from Tokyo hotels with recommended departure time based on traffic and flight schedule.",
        href: "/narita-airport-transfer"
      },
      {
        title: "Tokyo hotel to hotel transfer",
        description:
          "Private hotel transfer for travelers moving between Tokyo hotels, apartments, Shinjuku, Ginza, Shibuya, Tokyo Station, or Shinagawa.",
        href: "/tokyo-private-driver"
      },
      {
        title: "Tokyo Station or Shinagawa Shinkansen pickup",
        description:
          "Door-to-door pickup and drop-off for Shinkansen travelers arriving at Tokyo Station, Shinagawa Station, or nearby hotels.",
        href: "/tokyo-private-driver"
      },
      {
        title: "Toyota Alphard airport transfer",
        description:
          "Comfortable private car service for couples, families with children, and travelers carrying multiple suitcases.",
        href: "/tokyo-private-driver"
      },
      {
        title: "Mt Fuji day trip with English driver",
        description:
          "Private Mt Fuji day trip from Tokyo with an English-speaking driver, flexible pickup from hotels, and comfortable Toyota Alphard or Hiace options.",
        href: "/tokyo-private-driver"
      }
    ],
    faqTitle: "Tokyo Airport Transfer FAQ",
    faqSubtitle:
      "Clear answers for travelers booking a private car from Narita Airport, Haneda Airport, or Tokyo hotels.",
    faqs: [
      {
        question: "Do you provide both Narita and Haneda airport pickup?",
        answer:
          "Yes. We provide private airport pickup and drop-off for Narita Airport, Haneda Airport, Tokyo hotels, apartments, and nearby destinations such as Tokyo Disney Resort."
      },
      {
        question: "How do I get an accurate quote?",
        answer:
          "Use the map quote tool to choose your airport and destination, then send the booking form on WhatsApp with your flight number, landing time, passenger count, and luggage."
      },
      {
        question: "Is meet-and-greet with a name sign available?",
        answer:
          "Yes. Arrival-gate name-sign meet-and-greet is optional and costs +¥2,000 when requested. Please mention it before confirming the booking."
      },
      {
        question: "How long is the free waiting time?",
        answer:
          "Airport pickup includes 90 minutes of free waiting from the actual flight landing time. Airport drop-off includes 30 minutes of free waiting from the scheduled pickup time."
      },
      {
        question: "Which vehicles can I book?",
        answer:
          "Common vehicles include luxury sedans, Toyota Alphard, and Toyota Hiace. We recommend the vehicle based on passenger count, luggage, child seats, and comfort needs."
      },
      {
        question: "Can I book hotel transfers, Shinkansen pickup, or a Mt Fuji day trip?",
        answer:
          "Yes. Besides Narita and Haneda airport transfers, we can arrange Tokyo hotel-to-hotel transfers, Tokyo Station or Shinagawa Shinkansen pickup, and private Mt Fuji day trips with English-speaking drivers."
      }
    ]
  },
  ja: {
    routesTitle: "東京の人気空港送迎ルート",
    routesSubtitle:
      "成田空港・羽田空港の送迎、東京ホテル間移動、新幹線駅送迎、富士山日帰り観光に対応するプライベート送迎です。料金は距離、車種、荷物、到着時間をもとに見積もります。",
    routes: [
      {
        title: "成田空港から東京のホテルへ",
        description:
          "新宿、渋谷、銀座、浅草、品川など、東京中心部へのドアツードア成田空港送迎です。",
        href: "/narita-airport-transfer"
      },
      {
        title: "羽田空港から東京中心部へ",
        description:
          "銀座、築地、品川、新宿、渋谷、東京のクルーズターミナルへのスムーズな羽田空港送迎です。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "東京ホテルから成田・羽田へ",
        description:
          "フライト時刻と交通状況をもとに出発時間を提案し、東京ホテルから空港までお送りします。",
        href: "/narita-airport-transfer"
      },
      {
        title: "東京ホテル間の移動",
        description:
          "新宿、銀座、渋谷、東京駅、品川周辺など、東京のホテル・民泊・アパート間のプライベート移動に対応します。",
        href: "/tokyo-private-driver"
      },
      {
        title: "東京駅・品川駅の新幹線送迎",
        description:
          "東京駅、品川駅、新幹線到着後のホテル送迎や、ホテルから駅までの移動に対応します。",
        href: "/tokyo-private-driver"
      },
      {
        title: "アルファード空港送迎",
        description:
          "カップル、お子様連れのご家族、スーツケースが多い旅行者に使いやすいプライベートカーです。",
        href: "/tokyo-private-driver"
      },
      {
        title: "英語ドライバーの富士山日帰り",
        description:
          "東京ホテル発着の富士山日帰りプライベートツアー。英語対応ドライバーとアルファード、ハイエースなどを手配できます。",
        href: "/tokyo-private-driver"
      }
    ],
    faqTitle: "東京空港送迎 FAQ",
    faqSubtitle: "成田空港、羽田空港、東京ホテルから専用車を予約する際のよくある質問です。",
    faqs: [
      {
        question: "成田空港と羽田空港の両方に対応していますか？",
        answer:
          "はい。成田空港、羽田空港、東京のホテル、民泊、東京ディズニーリゾート周辺などのプライベート送迎に対応しています。"
      },
      {
        question: "正確な見積もりはどうすれば確認できますか？",
        answer:
          "地図見積もりで空港と目的地を選び、WhatsAppでフライト番号、到着時刻、人数、荷物数を送ると確認できます。"
      },
      {
        question: "ネームプレートでのお迎えはできますか？",
        answer:
          "はい。到着ゲートでのネームプレートお迎えはオプションで、希望時は+2,000円です。予約確定前にお知らせください。"
      },
      {
        question: "無料待機時間はどのくらいですか？",
        answer:
          "空港お迎えは実際の着陸時刻から90分無料、お送りは予約時刻から30分無料で待機します。"
      },
      {
        question: "どの車種を予約できますか？",
        answer:
          "セダン、トヨタ アルファード、トヨタ ハイエースなどをご用意できます。人数、荷物、チャイルドシート、快適性に合わせて提案します。"
      },
      {
        question: "ホテル間移動、新幹線駅送迎、富士山日帰りも予約できますか？",
        answer:
          "はい。成田空港・羽田空港の送迎以外に、東京ホテル間移動、東京駅・品川駅の新幹線送迎、英語対応ドライバーによる富士山日帰りも相談できます。"
      }
    ]
  },
  zh: {
    routesTitle: "东京热门机场接送路线",
    routesSubtitle:
      "提供成田机场、羽田机场、东京酒店移动、新干线站接送和富士山一日游之间的私人接送。报价会参考路线距离、车型、行李数量和到达时间。",
    routes: [
      {
        title: "成田机场到东京酒店",
        description:
          "成田机场到新宿、涩谷、银座、浅草、品川等东京市区的点对点私人接送。",
        href: "/narita-airport-transfer"
      },
      {
        title: "羽田机场到东京市区",
        description:
          "适合羽田机场到银座、筑地、品川、新宿、涩谷、东京邮轮码头等目的地。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "东京酒店送机到成田或羽田",
        description:
          "根据航班时间和路况建议出发时间，适合从东京酒店、民宿或公寓前往机场。",
        href: "/narita-airport-transfer"
      },
      {
        title: "东京酒店到酒店移动",
        description:
          "适合新宿、银座、涩谷、东京站、品川等区域之间的酒店换酒店、民宿、公寓点对点移动。",
        href: "/tokyo-private-driver"
      },
      {
        title: "东京站、品川站新干线接送",
        description:
          "适合搭乘新干线抵达东京站、品川站后的酒店接送，也可安排从东京酒店前往新干线车站。",
        href: "/tokyo-private-driver"
      },
      {
        title: "Toyota Alphard 机场接送",
        description:
          "适合情侣、亲子家庭和携带多件行李的旅客，也可根据人数和行李安排海狮等车型。",
        href: "/tokyo-private-driver"
      },
      {
        title: "富士山一日游英文司机",
        description:
          "东京酒店出发的富士山一日游包车，可安排中文或英文沟通，适合家庭、朋友和多人团队。",
        href: "/tokyo-private-driver"
      }
    ],
    faqTitle: "东京机场接送常见问题",
    faqSubtitle: "帮助旅客在成田机场、羽田机场和东京酒店之间预约私人专车。",
    faqs: [
      {
        question: "成田机场和羽田机场都可以接送吗？",
        answer:
          "可以。我们提供成田机场、羽田机场、东京酒店、民宿、公寓以及东京迪士尼周边等目的地的私人接送。"
      },
      {
        question: "怎样获得更准确的报价？",
        answer:
          "先在地图报价工具里选择机场和目的地，再通过 WhatsApp 发送航班号、落地时间、人数和行李数量。"
      },
      {
        question: "可以举牌接机吗？",
        answer:
          "可以。到达口举牌接机是可选服务，需要时另加 2,000 日元，请在确认订单前说明。"
      },
      {
        question: "免费等待时间多久？",
        answer:
          "接机从航班实际落地时间起免费等待90分钟，送机从预约时间起免费等待30分钟。"
      },
      {
        question: "可以安排哪些车型？",
        answer:
          "常用车型包括轿车、Toyota Alphard 和 Toyota Hiace。我们会根据人数、行李、儿童座椅和舒适度需求推荐车型。"
      },
      {
        question: "可以预约酒店移动、新干线接送或富士山一日游吗？",
        answer:
          "可以。除了成田机场和羽田机场接送，也可以安排东京酒店到酒店移动、东京站或品川站新干线接送，以及富士山一日游包车，可中文和英文沟通。"
      }
    ]
  }
};

export const airportGuideContent: Record<Locale, Record<"narita" | "haneda", AirportGuideContent>> = {
  en: {
    narita: {
      title: "Narita Airport Transfer Guide",
      subtitle:
        "Narita is farther from central Tokyo than Haneda, so the best quote should account for tolls, traffic, passenger count, luggage, and whether it is airport pickup or hotel drop-off.",
      destinationsTitle: "Common Narita transfer destinations",
      destinations: [
        {
          name: "Narita to Shinjuku or Shibuya",
          description: "Popular for first-time visitors staying near major hotels, stations, and nightlife areas."
        },
        {
          name: "Narita to Ginza, Tokyo Station, or Nihonbashi",
          description: "Convenient for business travelers and central Tokyo hotel stays."
        },
        {
          name: "Narita to Shinagawa or Tokyo Disney Resort",
          description: "Good for families with luggage, strollers, and children after a long flight."
        }
      ],
      tipsTitle: "Before you book",
      tips: [
        "Send your flight number so the driver can check the actual landing time.",
        "Tell us if you need a name sign at the arrival gate.",
        "Share luggage details so we can confirm whether Alphard or Hiace is the better fit."
      ]
    },
    haneda: {
      title: "Haneda Airport Transfer Guide",
      subtitle:
        "Haneda is closer to central Tokyo, so transfers are usually faster. Late-night arrivals, child seats, and larger luggage can still change the best vehicle choice.",
      destinationsTitle: "Common Haneda transfer destinations",
      destinations: [
        {
          name: "Haneda to Ginza, Tsukiji, or Tokyo Station",
          description: "A short private transfer for central Tokyo hotels and business trips."
        },
        {
          name: "Haneda to Shinjuku or Shibuya",
          description: "Reliable door-to-door pickup for popular hotel and apartment areas."
        },
        {
          name: "Haneda to Shinagawa or Yokohama",
          description: "Useful for early flights, cruise connections, and family travel."
        }
      ],
      tipsTitle: "Before you book",
      tips: [
        "For airport pickup, waiting time starts from actual flight landing.",
        "Late-night or early-morning rides may need extra schedule confirmation.",
        "Tell us the number of suitcases and carry-ons before confirming the vehicle."
      ]
    }
  },
  ja: {
    narita: {
      title: "成田空港送迎ガイド",
      subtitle:
        "成田空港は都心から距離があるため、高速料金、交通状況、人数、荷物、空港お迎えかホテルお送りかを考慮して見積もります。",
      destinationsTitle: "よくある成田空港送迎先",
      destinations: [
        {
          name: "成田から新宿・渋谷",
          description: "ホテル、駅、観光エリアに滞在する初めての旅行者に人気です。"
        },
        {
          name: "成田から銀座・東京駅・日本橋",
          description: "ビジネス利用や東京中心部のホテル滞在に便利です。"
        },
        {
          name: "成田から品川・東京ディズニーリゾート",
          description: "長距離フライト後のご家族、荷物、ベビーカーがある場合に便利です。"
        }
      ],
      tipsTitle: "予約前に確認すること",
      tips: [
        "フライト番号を送ると、実際の到着時刻を確認できます。",
        "到着ゲートでのネームプレートお迎えが必要かお知らせください。",
        "荷物数を共有いただくと、アルファードかハイエースか確認しやすくなります。"
      ]
    },
    haneda: {
      title: "羽田空港送迎ガイド",
      subtitle:
        "羽田空港は東京中心部に近く、移動時間が短いことが多いです。深夜到着、チャイルドシート、大きな荷物がある場合は車種確認が重要です。",
      destinationsTitle: "よくある羽田空港送迎先",
      destinations: [
        {
          name: "羽田から銀座・築地・東京駅",
          description: "東京中心部のホテルやビジネス利用に便利な短距離送迎です。"
        },
        {
          name: "羽田から新宿・渋谷",
          description: "ホテルや民泊エリアまで安心のドアツードア送迎です。"
        },
        {
          name: "羽田から品川・横浜",
          description: "早朝便、クルーズ接続、家族旅行にも使いやすいルートです。"
        }
      ],
      tipsTitle: "予約前に確認すること",
      tips: [
        "空港お迎えは実際の着陸時刻から待機時間を計算します。",
        "深夜・早朝便は事前にスケジュール確認をおすすめします。",
        "スーツケースと手荷物の数を予約前にお知らせください。"
      ]
    }
  },
  zh: {
    narita: {
      title: "成田机场接送指南",
      subtitle:
        "成田机场距离东京市区较远，合理报价需要考虑高速费、路况、人数、行李，以及是接机还是酒店送机。",
      destinationsTitle: "常见成田机场接送目的地",
      destinations: [
        {
          name: "成田到新宿或涩谷",
          description: "适合入住热门酒店、车站周边和市区观光区域的旅客。"
        },
        {
          name: "成田到银座、东京站或日本桥",
          description: "适合商务客人和入住东京中心区域酒店的旅客。"
        },
        {
          name: "成田到品川或东京迪士尼",
          description: "适合长途飞行后带行李、婴儿车和儿童的家庭。"
        }
      ],
      tipsTitle: "预约前建议提供",
      tips: [
        "发送航班号，司机可以查看实际落地时间。",
        "提前说明是否需要到达口举牌接机。",
        "告诉我们行李数量，方便确认 Alphard 或 Hiace 是否更合适。"
      ]
    },
    haneda: {
      title: "羽田机场接送指南",
      subtitle:
        "羽田机场离东京市区更近，接送通常更快。深夜到达、儿童座椅和大件行李仍会影响车型选择。",
      destinationsTitle: "常见羽田机场接送目的地",
      destinations: [
        {
          name: "羽田到银座、筑地或东京站",
          description: "适合东京中心区域酒店和商务出行的短途私人接送。"
        },
        {
          name: "羽田到新宿或涩谷",
          description: "适合热门酒店、公寓和民宿区域的点对点接送。"
        },
        {
          name: "羽田到品川或横滨",
          description: "适合早班机、邮轮衔接和家庭出行。"
        }
      ],
      tipsTitle: "预约前建议提供",
      tips: [
        "接机等待时间从航班实际落地开始计算。",
        "深夜或清晨用车建议提前确认司机排班。",
        "确认订单前请提供托运行李和随身行李数量。"
      ]
    }
  }
};
