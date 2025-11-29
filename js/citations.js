// Sources directly in citations.js script so as to avoid protocol issues
const sources = [
  {
    "key": "IAEA2021",
    "author": "International Atomic Energy Agency (IAEA)",
    "title": "Computer Security at Nuclear Facilities, NSS No. 17-T (Rev. 1)",
    "year": "2021",
    "url": "https://www.iaea.org/publications/13627/computer-security-at-nuclear-facilities"
  },
  {
    "key": "IAEA2020",
    "author": "International Atomic Energy Agency (IAEA)",
    "title": "Computer Security for Nuclear Security, NSS No. 42-G",
    "year": "2020",
    "url": "https://www.iaea.org/publications/13629/computer-security-for-nuclear-security"
  },
  {
    "key": "NIST800-82r3",
    "author": "National Institute of Standards and Technology (NIST)",
    "title": "SP 800-82 Rev. 3: Guide to Operational Technology (OT) Security",
    "year": "2023",
    "url": "https://csrc.nist.gov/pubs/sp/800/82/r3/final"
  },
  {
    "key": "IEC62443",
    "author": "International Society of Automation (ISA) / International Electrotechnical Commission (IEC)",
    "title": "IEC 62443 Series: Industrial Automation and Control Systems Security",
    "year": "2018-2024",
    "url": "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards"
  },
  {
    "key": "Stuxnet2010",
    "author": "Symantec Security Response",
    "title": "W32.Stuxnet Dossier: Technical Analysis of the Stuxnet Malware",
    "year": "2011",
    "url": "https://www.symantec.com/content/en/us/enterprise/media/security_response/whitepapers/w32_stuxnet_dossier.pdf"
  },
  {
    "key": "Langner2013",
    "author": "Langner, Ralph",
    "title": "To Kill a Centrifuge: A Technical Analysis of What Stuxnet's Creators Tried to Achieve",
    "year": "2013",
    "url": "https://www.langner.com/wp-content/uploads/2017/03/to-kill-a-centrifuge.pdf"
  },
  {
    "key": "IEEEStuxnet",
    "author": "IEEE Spectrum",
    "title": "The Real Story of Stuxnet",
    "year": "2013",
    "url": "https://spectrum.ieee.org/the-real-story-of-stuxnet"
  },
  {
    "key": "MITRE-ICS",
    "author": "MITRE Corporation",
    "title": "ATT&CK for Industrial Control Systems (ICS)",
    "year": "2024",
    "url": "https://attack.mitre.org/matrices/ics/"
  },
  {
    "key": "CISA-ICS",
    "author": "Cybersecurity and Infrastructure Security Agency (CISA)",
    "title": "Industrial Control Systems Cybersecurity Resources",
    "year": "2024",
    "url": "https://www.cisa.gov/topics/industrial-control-systems"
  },
  {
    "key": "Industroyer",
    "author": "ESET Research",
    "title": "Industroyer: Biggest Threat to Industrial Control Systems Since Stuxnet",
    "year": "2017",
    "url": "https://www.welivesecurity.com/2017/06/12/industroyer-biggest-threat-industrial-control-systems-since-stuxnet/"
  }
];

// Function to fetch JSON and process citations
async function loadCitations() {
  try {

    // 1. Replace all citation spans in the text
    const citationSpans = document.querySelectorAll('.citation');
    const usedCitations = new Map(); // Track which citations are used and their numbers
    let citationNumber = 1;
    
    citationSpans.forEach((span) => {
      const citeKey = span.getAttribute('data-cite');
      const source = sources.find(s => s.key === citeKey);
      if (source) {
        // Get or assign citation number
        if (!usedCitations.has(citeKey)) {
          usedCitations.set(citeKey, citationNumber);
          citationNumber++;
        }
        const num = usedCitations.get(citeKey);
        
        // Create clickable superscript citation
        const sup = document.createElement('sup');
        const link = document.createElement('a');
        link.href = `#source-${citeKey}`;
        link.textContent = `[${num}]`;
        link.className = 'citation-link';
        link.title = `${source.author}, ${source.title} (${source.year})`;
        link.style.cssText = 'color: #ffc107; text-decoration: none; cursor: pointer;';
        sup.appendChild(link);
        span.replaceWith(sup);
      }
    });

    // 2. Automatically populate full Sources list with only used citations
    const sourcesContainer = document.querySelector('#Sources ul');
    if (sourcesContainer) {
      sourcesContainer.innerHTML = ''; // clear old content
      
      // Sort used citations by their number
      const sortedCitations = Array.from(usedCitations.entries())
        .sort((a, b) => a[1] - b[1]);
      
      sortedCitations.forEach(([citeKey, num]) => {
        const source = sources.find(s => s.key === citeKey);
        if (source) {
          const li = document.createElement('li');
          li.id = `source-${citeKey}`;
          li.style.scrollMarginTop = '100px'; // Offset for fixed navbar
          
          const numSpan = document.createElement('span');
          numSpan.textContent = `[${num}] `;
          numSpan.style.fontWeight = 'bold';
          numSpan.style.color = '#ffc107';
          
          const a = document.createElement('a');
          a.href = source.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = `${source.author} — ${source.title} (${source.year})`;
          a.style.color = '#ffc107';
          
          li.appendChild(numSpan);
          li.appendChild(a);
          sourcesContainer.appendChild(li);
        }
      });
    }

  } catch (err) {
    console.error('Failed to load citations:', err);
  }
}

// Run the function after page load
document.addEventListener('DOMContentLoaded', loadCitations);