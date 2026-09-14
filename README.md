# राजभाषा कृतिदेव ०१० फोंट परिवर्तक (Kruti Dev 010 Converter)

A specialized web application for Indian Government Office document workflows that converts standard Unicode Hindi (Mangal font) into Kruti Dev 010 format with high accuracy, complete handling of complex Devnagari conjuncts, matra reordering (`ि`, `र्`), numbers, symbols, and punctuation.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Offline Capable](https://img.shields.io/badge/offline-100%25-brightgreen.svg)

---

## 🌟 Key Features

1. **High-Precision Conversion Engine**:
   - Automatic reordering of prefix matra `ि` (Chhoti I) and Reph `र्`.
   - Complete support for complex Devnagari conjuncts: `द्व` (}`), `द्ध` (`ö`), `द्य` (`|`), `द्भ` (`Ò`), `ह्न` (`g~u`), `ह्म` (`ã`), `हृ` (`â`), `दृ` (`n¥`), `त्र` (`=`), `ज्ञ` (`%`), `क्ष` (`ô`), `श्र` (`J`), `राष्ट्र` (`jk’k~Vª`).
   - Bidirectional conversion (Unicode ↔ Kruti Dev 010).

2. **Symbol & Punctuation Protection (Times New Roman)**:
   - Auto-detects symbols (`?`, `!`, `/`, `:`, `;`, `=`, `%`, `(`, `)`, `-`, `+`), numbers (`0-9`), and English text.
   - Formats symbols and digits in **Times New Roman** so MS Word displays true question marks `?`, colons `:`, and slashes `/` instead of distorted Kruti Dev Hindi characters (like `घ्`, `ध`, `य`, `त्र`).

3. **1-Click Rich MS Word Copy**:
   - Copies dual-font HTML formatting to clipboard so pasting into Microsoft Word automatically applies **Kruti Dev 010** to Hindi text and **Times New Roman** to numbers and symbols.

4. **Government Office Document Templates**:
   - Ready-made official templates: **टिप्पणी (Note Sheet)**, **कार्यालय आदेश (Office Order)**, **कार्यालय ज्ञापन (Office Memorandum)**, **शासकीय पत्र (Official Letter)**, and **अधिसूचना (Notification)**.

5. **Alt-Codes Cheatsheet**:
   - Built-in visual Alt-codes guide for tricky Kruti Dev characters (e.g. `Alt+0204`, `Alt+0205`, `Alt+0226`).

---

## 🚀 How to Run

### Direct Browser Access (100% Offline)
Simply double-click `index.html` in any web browser (Chrome, Edge, Firefox).

### Local HTTP Server
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your browser.

---

## 📄 License
MIT License
