/**
 * ==========================================================================
 * KRUTI DEV 010 CONVERTER - APPLICATION LOGIC & UI HANDLERS
 * Government Office Document Workflows, Rich MS Word Copy & Templates
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ----------------------------------------------------------------------
    // 1. DOM Element References
    // ----------------------------------------------------------------------
    const unicodeInput = document.getElementById('unicodeInput');
    const krutiRenderedOutput = document.getElementById('krutiRenderedOutput');
    const krutiRawOutput = document.getElementById('krutiRawOutput');

    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const fontSizeDecBtn = document.getElementById('fontSizeDecBtn');
    const fontSizeIncBtn = document.getElementById('fontSizeIncBtn');
    const fontSizeDisplay = document.getElementById('fontSizeDisplay');

    const tnrPreserveCheck = document.getElementById('tnrPreserveCheck');
    const autoFixCheck = document.getElementById('autoFixCheck');
    const tnrStatusPill = document.getElementById('tnrStatusPill');

    const swapDirectionBtn = document.getElementById('swapDirectionBtn');
    const directionLabel = document.getElementById('directionLabel');
    const sourceBadge = document.getElementById('sourceBadge');
    const targetBadge = document.getElementById('targetBadge');

    const templateSelect = document.getElementById('templateSelect');

    const pasteInputBtn = document.getElementById('pasteInputBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    const viewRenderedBtn = document.getElementById('viewRenderedBtn');
    const viewRawBtn = document.getElementById('viewRawBtn');
    const copyWordBtn = document.getElementById('copyWordBtn');

    const downloadBtn = document.getElementById('downloadBtn');
    const downloadMenu = document.getElementById('downloadMenu');
    const downloadDocxOption = document.getElementById('downloadDocxOption');
    const downloadTxtOption = document.getElementById('downloadTxtOption');
    const downloadHtmlOption = document.getElementById('downloadHtmlOption');

    const altCodesModalBtn = document.getElementById('altCodesModalBtn');
    const altCodesModal = document.getElementById('altCodesModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');

    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    // App State
    let currentFontSize = 18;
    let conversionDirection = 'unicodeToKruti'; // 'unicodeToKruti' or 'krutiToUnicode'
    let currentRawKrutiText = '';

    // ----------------------------------------------------------------------
    // 2. Government Office Document Templates (Unicode Mangal)
    // ----------------------------------------------------------------------
    const officeTemplates = {
        noteSheet: `कार्यालय टिप्पणी (Note Sheet)
नस्ती संख्या: 104/प्रशासन/2026

विषय: विभाग में नए कंप्यूटर एवं प्रिंटर क्रय किए जाने के सम्बन्ध में।

1. मन्जूरी हेतु प्रस्तुत:
उपरोक्त विषयान्तर्गत लेख है कि अनुभाग में पुराने कंप्यूटर की कार्यक्षमता प्रभावित हो रही है। अतः 02 नए उच्च-क्षमता कंप्यूटर एवं 01 लेज़र प्रिंटर (Times New Roman Model 2026) क्रय किया जाना प्रस्तावित है।

2. वित्तीय स्वीकृति:
अपेक्षित व्यय लगभग Rs. 1,20,000/- (एक लाख बीस हजार रुपये मात्र) होगा, जिसकी व्यवस्था वर्तमान वित्तीय वर्ष 2026-27 के बजट शीर्ष से की जा सकती है।

आदेशार्थ एवं अनुमोदनार्थ प्रस्तुत है।

(हस्ताक्षर)
अनुभाग अधिकारी
दिनांक: 14/09/2026`,

        officeOrder: `कार्यालय आदेश (Office Order)
संख्या: 520/स्थापना/2026
दिनांक: 14 सितंबर 2026

कार्यालय आदेश

सर्वसाधारण को सूचित किया जाता है कि आगामी राष्ट्रीय पर्व के दृष्टिगत दिनांक 15/09/2026 को अपराह्न 3:00 बजे मुख्य सभागार में एक आवश्यक समीक्षा बैठक आयोजित की जाएगी।

2. बैठक में सभी अनुभाग अधिकारियों (द्वारा निर्देशित) की समय पर उपस्थिति अनिवार्य है। अनुपस्थिति की स्थिति में सम्बन्धित अधिकारी के विरुद्ध नियमानुसार कार्यवाही की जाएगी।

(द्वारा आदेशानुसार)

(हस्ताक्षर)
प्रशासनिक अधिकारी
दूरभाष: 011-23456789`,

        memorandum: `कार्यालय ज्ञापन (Office Memorandum)
संख्या: F.No. 12/04/2026-Admin
दिनांक: 14/09/2026

कार्यालय ज्ञापन

विषय: अधिकारियों एवं कर्मचारियों हेतु नवीन परिचय पत्र (ID Card) जारी करने बाबत।

अधोहस्ताक्षरी को यह कहने का निर्देश हुआ है कि सभी अधिकारी/कर्मचारी अपने नवीनतम पासपोर्ट साइज फोटो एवं आधार विवरण दिनांक 20/09/2026 तक स्थापना अनुभाग में जमा कराना सुनिश्चित करें।

(हस्ताक्षर)
उप सचिव (प्रशासन)
भारत सरकार`,

        officialLetter: `शासकीय पत्र (Official Letter)
पत्र संख्या: 789/शिक्षा-2/2026
प्रेषक:
   संयुक्त सचिव,
   शिक्षा विभाग,
   शासन सचिवालय।

सेवा में,
   समस्त मण्डलीय उप-निदेशक,
   शिक्षा विभाग।

दिनांक: 14 सितंबर 2026

विषय: विद्यालय स्तरीय वार्षिक निरीक्षण रिपोर्ट 2026 प्रेषित करने बाबत।

महोदय,
   उपरोक्त विषयान्तर्गत निवेदन है कि वर्ष 2026-27 हेतु निर्धारित वार्षिक निरीक्षण कार्य समय सीमा के भीतर पूर्ण कर रिपोर्ट संलग्न प्रारूप में प्रेषित करें।

संलग्नक: यथोक्त।

भवदीय,

(हस्ताक्षर)
(संयुक्त सचिव)`,

        notification: `अधिसूचना (Notification)
संख्या: 45/राजभाषा/2026
दिनांक: 14/09/2026

अधिसूचना

राजभाषा अधिनियम 1963 की धारा 3(3) के अनुपालन में यह अधिसूचित किया जाता है कि कार्यालय के समस्त सामान्य आदेश, ज्ञापन, अधिसूचनाएँ एवं निविदा सूचनाएँ अनिवार्य रूप से द्विभाषी (हिंदी एवं अंग्रेजी) रूप में जारी की जाएँगी।

(राज्यपाल/राष्ट्रपति के आदेश से)

(हस्ताक्षर)
प्रमुख सचिव`
    };

    // ----------------------------------------------------------------------
    // 3. Core Conversion & Formatting Logic
    // ----------------------------------------------------------------------
    function performConversion() {
        const inputText = unicodeInput.value;

        // Update stats
        charCount.textContent = inputText.length;
        wordCount.textContent = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
        lineCount.textContent = inputText ? inputText.split('\n').length : 0;

        if (!inputText) {
            krutiRenderedOutput.innerHTML = '';
            krutiRawOutput.value = '';
            currentRawKrutiText = '';
            return;
        }

        const options = {
            preserveTNR: tnrPreserveCheck.checked,
            autoFix: autoFixCheck.checked
        };

        if (conversionDirection === 'unicodeToKruti') {
            // Get raw converted Kruti Dev text
            currentRawKrutiText = KrutiConverter.unicodeToKruti(inputText, options);
            krutiRawOutput.value = currentRawKrutiText;

            // Generate HTML formatted output for preview & Word clipboard
            let formattedHTML = KrutiConverter.formatWithTimesNewRomanHTML(inputText, options);
            // Replace newlines with <br> for HTML preview box
            formattedHTML = formattedHTML.replace(/\n/g, '<br>');
            krutiRenderedOutput.innerHTML = formattedHTML;
        } else {
            // Reverse Conversion: Kruti Dev to Unicode
            let convertedUnicode = KrutiConverter.krutiToUnicode(inputText);
            currentRawKrutiText = convertedUnicode;
            krutiRawOutput.value = convertedUnicode;
            krutiRenderedOutput.innerText = convertedUnicode;
        }
    }

    // ----------------------------------------------------------------------
    // 4. MS Word Clipboard Rich Copy Feature
    // ----------------------------------------------------------------------
    async function copyForMSWord() {
        if (!currentRawKrutiText && !unicodeInput.value) {
            showToast('कृपया पहले कोई पाठ दर्ज करें!');
            return;
        }

        const options = {
            preserveTNR: tnrPreserveCheck.checked,
            autoFix: autoFixCheck.checked
        };

        let rawText = currentRawKrutiText;
        let htmlContent = "";

        if (conversionDirection === 'unicodeToKruti') {
            let innerHTML = KrutiConverter.formatWithTimesNewRomanHTML(unicodeInput.value, options);
            innerHTML = innerHTML.replace(/\n/g, '<br>');

            // Build full styled HTML document fragment for MS Word Clipboard
            htmlContent = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office"
                      xmlns:w="urn:schemas-microsoft-com:office:word"
                      xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                    <meta charset="utf-8">
                    <style>
                        body, p, div {
                            font-family: 'Kruti Dev 010', 'KrutiDev010', 'DevLys 010', sans-serif;
                            font-size: 14pt;
                            line-height: 1.5;
                        }
                        .tnr-segment {
                            font-family: 'Times New Roman', Times, serif !important;
                            font-size: 12pt;
                        }
                    </style>
                </head>
                <body>
                    <div style="font-family: 'Kruti Dev 010', 'KrutiDev010', 'DevLys 010', sans-serif; font-size: 14pt;">
                        ${innerHTML}
                    </div>
                </body>
                </html>
            `;
        } else {
            htmlContent = `<div style="font-family: 'Noto Sans Devanagari', 'Mangal', sans-serif; font-size: 14pt;">${rawText.replace(/\n/g, '<br>')}</div>`;
        }

        try {
            if (navigator.clipboard && window.ClipboardItem) {
                const blobHTML = new Blob([htmlContent], { type: 'text/html' });
                const blobText = new Blob([rawText], { type: 'text/plain' });
                const item = new ClipboardItem({
                    'text/html': blobHTML,
                    'text/plain': blobText
                });
                await navigator.clipboard.write([item]);
                showToast('✓ MS Word हेतु कॉपी किया गया! (Times New Roman + Kruti Dev 010)');
            } else {
                // Fallback text copy
                await navigator.clipboard.writeText(rawText);
                showToast('✓ पाठ क्लिपबोर्ड पर कॉपी किया गया!');
            }
        } catch (err) {
            console.error('Copy failed:', err);
            // Fallback execCommand
            let hiddenDiv = document.createElement('div');
            hiddenDiv.innerHTML = htmlContent;
            hiddenDiv.style.position = 'fixed';
            hiddenDiv.style.left = '-9999px';
            document.body.appendChild(hiddenDiv);
            
            let range = document.createRange();
            range.selectNodeContents(hiddenDiv);
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
            document.body.removeChild(hiddenDiv);
            
            showToast('✓ MS Word हेतु कॉपी किया गया!');
        }
    }

    // ----------------------------------------------------------------------
    // 5. Quick Fixes Tool Handlers
    // ----------------------------------------------------------------------
    function applyQuickFix(fixType) {
        let text = unicodeInput.value;
        if (!text) return;

        switch (fixType) {
            case 'matras':
                // Fix double matras or broken halant combinations
                text = text.replace(/िि/g, "ि").replace(/ीी/g, "ी").replace(/््/g, "्");
                showToast('✓ मात्रा सुधार लागू किया गया!');
                break;

            case 'brackets':
                // Standardize English/Hindi brackets
                text = text.replace(/\[/g, '(').replace(/\]/g, ')').replace(/\{/g, '(').replace(/\}/g, ')');
                showToast('✓ कोष्ठक ( ) सुधार लागू!');
                break;

            case 'quotes':
                // Standardize quotes
                text = text.replace(/[“”"']/g, '"');
                showToast('✓ उद्धरण चिन्ह " " सुधार लागू!');
                break;

            case 'digitsToEnglish':
                // Convert Hindi digits ०-९ to English 0-9 (Times New Roman compatible)
                const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
                for (let i = 0; i < 10; i++) {
                    text = text.replace(new RegExp(hindiDigits[i], 'g'), i.toString());
                }
                showToast('✓ अंक ➔ English (0-9 Times New Roman) में परिवर्तित!');
                break;

            case 'digitsToHindi':
                // Convert English digits 0-9 to Hindi digits ०-९
                const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                const hDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
                for (let i = 0; i < 10; i++) {
                    text = text.replace(new RegExp(englishDigits[i], 'g'), hDigits[i]);
                }
                showToast('✓ अंक ➔ हिंदी (०-९) में परिवर्तित!');
                break;

            case 'spaces':
                // Clean double spaces and trailing spaces
                text = text.replace(/[ \t]+/g, ' ').replace(/\n /g, '\n').trim();
                showToast('✓ अतिरिक्त स्पेस हटाए गए!');
                break;
        }

        unicodeInput.value = text;
        performConversion();
    }

    // ----------------------------------------------------------------------
    // 6. Download Handlers (.docx, .txt, .html)
    // ----------------------------------------------------------------------
    function downloadDocx() {
        if (!currentRawKrutiText && !unicodeInput.value) {
            showToast('डाउनलोड करने के लिए पहले पाठ दर्ज करें!');
            return;
        }

        const options = {
            preserveTNR: tnrPreserveCheck.checked,
            autoFix: autoFixCheck.checked
        };

        let innerHTML = KrutiConverter.formatWithTimesNewRomanHTML(unicodeInput.value, options);
        innerHTML = innerHTML.replace(/\n/g, '<br>');

        const docxContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta charset="utf-8">
                <title>Govt Office Order - Kruti Dev 010</title>
                <!--[if gte mso 9]>
                <xml>
                <w:WordDocument>
                <w:View>Normal</w:View>
                <w:Zoom>100</w:Zoom>
                <w:DoNotOptimizeForBrowser/>
                </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                    @page {
                        size: A4;
                        margin: 1in;
                    }
                    body {
                        font-family: 'Kruti Dev 010', 'KrutiDev010', 'DevLys 010', sans-serif;
                        font-size: 14pt;
                        line-height: 1.6;
                    }
                    .tnr-segment {
                        font-family: 'Times New Roman', Times, serif !important;
                        font-size: 12pt;
                    }
                </style>
            </head>
            <body>
                <div>${innerHTML}</div>
            </body>
            </html>
        `;

        const blob = new Blob(['\ufeff' + docxContent], { type: 'application/msword' });
        saveBlob(blob, 'Govt_Office_Document_KrutiDev010.doc');
        showToast('✓ MS Word (.doc) दस्तावेज डाउनलोड हो गया!');
    }

    function downloadTxt() {
        if (!currentRawKrutiText) {
            showToast('डाउनलोड करने के लिए पहले पाठ दर्ज करें!');
            return;
        }
        const blob = new Blob([currentRawKrutiText], { type: 'text/plain;charset=utf-8' });
        saveBlob(blob, 'Kruti_Dev_010_Text.txt');
        showToast('✓ प्लेन टेक्स्ट (.txt) फाइल डाउनलोड हो गई!');
    }

    function downloadHtml() {
        if (!unicodeInput.value) return;
        const options = { preserveTNR: true, autoFix: true };
        let innerHTML = KrutiConverter.formatWithTimesNewRomanHTML(unicodeInput.value, options);

        const htmlDoc = `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <title>Kruti Dev 010 Document</title>
    <style>
        body { font-family: 'Kruti Dev 010', sans-serif; font-size: 18px; line-height: 1.6; padding: 40px; }
        .tnr-segment { font-family: 'Times New Roman', serif; }
    </style>
</head>
<body>
    <div>${innerHTML.replace(/\n/g, '<br>')}</div>
</body>
</html>`;

        const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
        saveBlob(blob, 'Kruti_Dev_Document.html');
        showToast('✓ HTML दस्तावेज डाउनलोड हो गया!');
    }

    function saveBlob(blob, fileName) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    // ----------------------------------------------------------------------
    // 7. Event Listeners & UI Wire-up
    // ----------------------------------------------------------------------

    // Live Typing Event
    unicodeInput.addEventListener('input', performConversion);

    // Option Checkboxes Change
    tnrPreserveCheck.addEventListener('change', function () {
        if (tnrPreserveCheck.checked) {
            tnrStatusPill.style.display = 'inline-block';
        } else {
            tnrStatusPill.style.display = 'none';
        }
        performConversion();
    });

    autoFixCheck.addEventListener('change', performConversion);

    // Template Dropdown Selection
    templateSelect.addEventListener('change', function () {
        const key = templateSelect.value;
        if (key && officeTemplates[key]) {
            unicodeInput.value = officeTemplates[key];
            performConversion();
            showToast('✓ शासकीय प्रारूप लोड हो गया!');
        }
    });

    // Paste & Clear Buttons
    pasteInputBtn.addEventListener('click', async function () {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                unicodeInput.value = text;
                performConversion();
                showToast('✓ पाठ पेस्ट कर दिया गया!');
            }
        } catch (err) {
            showToast('क्लिपबोर्ड एक्सेस की अनुमति नहीं मिली। Ctrl+V का उपयोग करें।');
        }
    });

    clearInputBtn.addEventListener('click', function () {
        unicodeInput.value = '';
        performConversion();
        unicodeInput.focus();
        showToast('पाठ साफ़ कर दिया गया!');
    });

    // Direction Swap Button
    swapDirectionBtn.addEventListener('click', function () {
        if (conversionDirection === 'unicodeToKruti') {
            conversionDirection = 'krutiToUnicode';
            directionLabel.textContent = 'दिशा: Kruti Dev ➔ Unicode';
            sourceBadge.textContent = 'कृतिदेव ०१० इनपुट (Kruti Dev Input)';
            targetBadge.textContent = 'यूनिकोड आउटपुट (Unicode Output)';
            unicodeInput.placeholder = 'यहाँ कृतिदेव 010 ASCII कोड पेस्ट करें...';
        } else {
            conversionDirection = 'unicodeToKruti';
            directionLabel.textContent = 'दिशा: Unicode ➔ Kruti Dev';
            sourceBadge.textContent = 'यूनिकोड / मंगल फोंट (Unicode Input)';
            targetBadge.textContent = 'कृतिदेव ०१० आउटपुट (Kruti Dev 010)';
            unicodeInput.placeholder = 'यहाँ अपना हिंदी पाठ (Unicode/मंगल) टाइप या पेस्ट करें...';
        }
        performConversion();
    });

    // View Toggle Buttons (Font Preview vs Raw ASCII)
    viewRenderedBtn.addEventListener('click', function () {
        viewRenderedBtn.classList.add('active');
        viewRawBtn.classList.remove('active');
        krutiRenderedOutput.style.display = 'block';
        krutiRawOutput.style.display = 'none';
    });

    viewRawBtn.addEventListener('click', function () {
        viewRawBtn.classList.add('active');
        viewRenderedBtn.classList.remove('active');
        krutiRenderedOutput.style.display = 'none';
        krutiRawOutput.style.display = 'block';
    });

    // Copy to MS Word Button
    copyWordBtn.addEventListener('click', copyForMSWord);

    // Download Dropdown Toggle
    downloadBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        downloadMenu.classList.toggle('show');
    });

    document.addEventListener('click', function () {
        downloadMenu.classList.remove('show');
    });

    downloadDocxOption.addEventListener('click', function (e) {
        e.preventDefault();
        downloadDocx();
    });

    downloadTxtOption.addEventListener('click', function (e) {
        e.preventDefault();
        downloadTxt();
    });

    downloadHtmlOption.addEventListener('click', function (e) {
        e.preventDefault();
        downloadHtml();
    });

    // Quick Fixes Strip Buttons
    document.querySelectorAll('.fix-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const fixType = this.getAttribute('data-fix');
            applyQuickFix(fixType);
        });
    });

    // Font Size Adjustments
    fontSizeIncBtn.addEventListener('click', function () {
        if (currentFontSize < 32) {
            currentFontSize += 2;
            updateFontSize();
        }
    });

    fontSizeDecBtn.addEventListener('click', function () {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            updateFontSize();
        }
    });

    function updateFontSize() {
        document.documentElement.style.setProperty('--editor-font-size', currentFontSize + 'px');
        fontSizeDisplay.textContent = currentFontSize + 'px';
    }

    // Theme Switch (Dark/Light)
    themeToggleBtn.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Alt Codes Modal Open/Close
    altCodesModalBtn.addEventListener('click', function () {
        altCodesModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', function () {
        altCodesModal.classList.remove('active');
    });

    closeModalFooterBtn.addEventListener('click', function () {
        altCodesModal.classList.remove('active');
    });

    altCodesModal.addEventListener('click', function (e) {
        if (e.target === altCodesModal) {
            altCodesModal.classList.remove('active');
        }
    });

    // Toast Notification Function
    function showToast(message) {
        toastMessage.textContent = message;
        toastNotification.classList.add('show');
        setTimeout(function () {
            toastNotification.classList.remove('show');
        }, 3200);
    }

    // Trigger Initial Conversion on Page Load
    performConversion();
});
