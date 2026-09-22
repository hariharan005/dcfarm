# 🌱 DC Farm Website

Welcome to the **DC Farm Website** project!  
This is a **single-page application (SPA)** built with **React** to showcase our organic farming business, products, and vision while allowing customers to connect directly with us through **WhatsApp**.

---

## 🚜 About DC Farm

At **DC Farm**, we believe in bringing **fresh, chemical-free, and organically grown vegetables & fruits** directly from our farm to your table.  
We also emphasize **community support**, giving back to orphanages with donations, and building a sustainable food ecosystem.

---

## 📌 Website Features

The website is designed as a modern, responsive single-page app with:

1. **Header**
    - Logo
    - Navigation links: Home, About, Products, Blog (future), Contact

2. **Hero Section**
    - Attractive **background image**
    - Brand name: **DC Farm**

3. **Carousel Section**
    - Slideshow of fresh organic crops & farm highlights

4. **About Section**
    - About Us
    - Vision
    - Mission

5. **WhatsApp QR Section**
    - Scan & **join our customer WhatsApp group**
    - Direct ordering made simple

6. **Testimonials Section**
    - Real feedback from our happy customers

7. **Footer**
    - Contact details
    - Address
    - Social media links
    - Copyright notice

---

## 🛠️ Tech Stack

- **Frontend:** React (Create React App)
- **Styling:** CSS / Tailwind CSS (optional)
- **Deployment:** Vercel (CI/CD setup for future domain: `dcfarm.com`)

---

## 📂 Project Structure

```
dcfarm/
├── public/
│   └── index.html
├── src/
│   ├── assets/         # Images, icons, and static files
│   ├── components/     # Reusable UI components (Header, Footer, Carousel, etc.)
│   ├── sections/       # Page sections (Hero, About, Testimonials, etc.)
│   ├── App.jsx         # Main app structure
│   ├── index.js        # Entry point
│   └── styles/         # CSS files (if not using Tailwind)
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/dcfarm.git
cd dcfarm
```

### For .env local dev create only .env and paste the variable 
```
only change the FRONTEND_URL=http://localhost:3000,http://localhost:5001,http://localhost:5002

and 

REACT_APP_API_URL="http://localhost:5000/api"

other same as production, this is only for developer reference 
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run locally

```bash
npm start
```

### 4️⃣ Build for production

```bash
npm run build
```

---

## 🌍 Deployment

The project is set up for deployment on **Vercel**.  
Simply push changes to the `main` branch, and Vercel will auto-deploy.

---

## 📞 Contact DC Farm

📍 Location: [Your Farm Address]  
📧 Email: [your email]  
📱 WhatsApp: [phone number]

👉 **Join our community** via WhatsApp QR on the site!

---