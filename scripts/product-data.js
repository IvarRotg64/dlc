/** @format */

// Product data for the store
const products = [
	{
		id: 1,
		name: "Blueberry Vape",
		category: "vapes",
		price: 350,
		image: "assets/images/vapes.png",
		desc: "Smooth blueberry flavor.",
	},
	{
		id: 2,
		name: "OG Kush Flower",
		category: "flowers",
		price: 250, // default price for 1g
		grams: [
			{ label: "1g", value: 1, price: 250 },
			{ label: "2g", value: 2, price: 480 },
			{ label: "3.5g", value: 3.5, price: 800 },
		],
		image: "assets/images/ogkush.jpeg",
		desc: "Classic OG Kush strain.",
	},
	{
		id: 3,
		name: "Moonstick Preroll",
		category: "moonsticks",
		price: 120,
		grams: [
			{ label: "Pre-roll (1g)", value: 1, price: 120 },
			{ label: "Mini-jay (0.6g)", value: 0.6, price: 80 },
			{ label: "Shooter (0.3g)", value: 0.3, price: 50 },
		],
		image: "assets/images/moonsticks.png",
		desc: "Potent preroll moonstick.",
	},
	{
		id: 4,
		name: "Gummy Edibles",
		category: "edibles",
		price: 180,
		image: "assets/images/gummies.jpeg",
		desc: "Assorted THC gummies.",
	},
	{
		id: 5,
		name: "Strawberry Vape",
		category: "vapes",
		price: 350,
		image: "assets/images/berryvape.jpeg",
		desc: "Sweet strawberry flavor.",
	},
	{
		id: 6,
		name: "Lemon Haze Flower",
		category: "flowers",
		price: 270,
		grams: [
			{ label: "1g", value: 1, price: 270 },
			{ label: "2g", value: 2, price: 520 },
			{ label: "3.5g", value: 3.5, price: 900 },
		],
		image: "assets/images/Lemon.webp",
		desc: "Citrus sativa strain.",
	},
	{
		id: 7,
		name: "Brownie Edibles",
		category: "edibles",
		price: 200,
		image: "assets/images/brownies.jpg",
		desc: "Rich chocolate brownies.",
	},
	{
		id: 8,
		name: "Hydroponic Pre-rolls, Mini-jays & Shooters",
		category: "moonsticks",
		price: 120,
		grams: [
			{ label: "Pre-roll (1g)", value: 1, price: 120 },
			{ label: "Mini-jay (0.6g)", value: 0.6, price: 80 },
			{ label: "Shooter (0.3g)", value: 0.3, price: 50 },
		],
		image: "assets/images/moonsticks.png",
		desc: `Grown in advanced hydroponic systems, these buds thrive in a soil-free environment, absorbing nutrients directly from water. This method ensures potent, dense, and resin-rich flowers with unmatched purity and flavor. Hydroponic cannabis is known for its smooth smoke, powerful effects, and premium quality.`,
	},
	{
		id: 9,
		name: "Hydroponic Bud",
		category: "flowers",
		price: 250,
		grams: [
			{ label: "1g", value: 1, price: 250 },
			{ label: "2g", value: 2, price: 480 },
			{ label: "3.5g", value: 3.5, price: 800 },
		],
		image: "assets/images/hydroponic.jpeg",
		desc: `Grown in advanced hydroponic systems, these buds thrive in a soil-free environment, absorbing nutrients directly from water. This method ensures potent, dense, and resin-rich flowers with unmatched purity and flavor. Hydroponic cannabis is known for its smooth smoke, powerful effects, and premium quality.`,
	},
	{
		id: 10,
		name: "Indoor Pre-rolls, Mini-jays & Shooters",
		category: "moonsticks",
		price: 100,
		grams: [
			{ label: "Pre-roll (1g)", value: 1, price: 100 },
			{ label: "Mini-jay (0.6g)", value: 0.6, price: 70 },
			{ label: "Shooter (0.3g)", value: 0.3, price: 40 },
		],
		image: "assets/images/moonsticks.png",
		desc: `Cultivated in a controlled indoor environment, these premium buds receive optimized lighting, humidity, and temperature, resulting in denser, resin-rich flowers. Indoor-grown cannabis is known for its top-tier potency, rich aromas, and smooth experience. Perfect for those who appreciate high-quality, carefully curated strains.`,
	},
	{
		id: 11,
		name: "Indoor Bud",
		category: "flowers",
		price: 200,
		grams: [
			{ label: "1g", value: 1, price: 200 },
			{ label: "2g", value: 2, price: 380 },
			{ label: "3.5g", value: 3.5, price: 650 },
		],
		image: "assets/images/indoor.jpg",
		desc: `Cultivated in a controlled indoor environment, these premium buds receive optimized lighting, humidity, and temperature, resulting in denser, resin-rich flowers. Indoor-grown cannabis is known for its top-tier potency, rich aromas, and smooth experience. Perfect for those who appreciate high-quality, carefully curated strains.`,
	},
];

export { products };
