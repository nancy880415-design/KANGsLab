const tools = [
  {
    name: "圖片設計優化指令",
    category: "設計優化",
    useCase: "圖片設計",
    description: "整理圖片設計與視覺優化提示詞，協助你快速產出更清楚、更有質感的 AI 圖像需求。",
    url: "https://chatgpt.com/g/g-6a0139f4caac819189c3e6421747f40d-tu-pian-she-ji-you-hua-zhi-ling"
  },
  {
    name: "社群品牌文案發想工具",
    category: "社群文案",
    useCase: "文案發想",
    description: "協助規劃社群貼文、品牌語氣與內容切角，適合需要穩定產出貼文靈感時使用。",
    url: "https://chatgpt.com/g/g-6a056611971c819193c31db559ebe768-she-qun-pin-pai-wen-an-fa-xiang-gong-ju"
  },
  {
    name: "Ellie 放心說文案產生器",
    category: "內容生成",
    useCase: "文案生成",
    description: "用更自然的語氣產生文案初稿，適合活動介紹、產品說明與日常內容撰寫。",
    url: "https://chatgpt.com/g/g-6a018b32bb7881919fe467733cfd5e78-ellie-fang-xin-shuo-wen-an-chan-sheng-qi"
  },
  {
    name: "品牌策略協助專家",
    category: "品牌策略",
    useCase: "策略規劃",
    description: "協助釐清品牌定位、受眾輪廓、溝通主軸與策略方向，適合做品牌規劃前的思考整理。",
    url: "https://chatgpt.com/g/g-6a16ebcca20881919195419747d582f2-pin-pai-ce-lue-xie-zhu-zhuan-jia"
  }
];

const toolsGrid = document.querySelector("#toolsGrid");
const filterRow = document.querySelector("#filterRow");
const searchInput = document.querySelector("#toolSearch");
const toolCount = document.querySelector("#toolCount");
const allCategory = "全部";
const categories = [allCategory, ...new Set(tools.map((tool) => tool.category))];
let activeCategory = allCategory;
let searchTerm = "";

toolCount.textContent = tools.length;

function renderFilters() {
  filterRow.innerHTML = categories
    .map((category) => {
      const count = category === allCategory ? tools.length : tools.filter((tool) => tool.category === category).length;
      return `
        <button class="filter-button ${category === activeCategory ? "is-active" : ""}" type="button" data-category="${category}">
          ${category}
          <span>${count}</span>
        </button>
      `;
    })
    .join("");
}

function getVisibleTools() {
  const keyword = searchTerm.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesCategory = activeCategory === allCategory || tool.category === activeCategory;
    const searchableText = `${tool.name} ${tool.category} ${tool.useCase} ${tool.description}`.toLowerCase();
    const matchesSearch = !keyword || searchableText.includes(keyword);
    return matchesCategory && matchesSearch;
  });
}

function renderTools() {
  const visibleTools = getVisibleTools();

  if (!visibleTools.length) {
    toolsGrid.innerHTML = `<p class="empty-state">找不到符合條件的工具，換個關鍵字試試看。</p>`;
    return;
  }

  toolsGrid.innerHTML = visibleTools
    .map(
      (tool, index) => `
        <article class="tool-card">
          <div>
            <div class="tool-topline">
              <span class="tool-number">${String(index + 1).padStart(2, "0")}</span>
              <span class="tool-tag">${tool.category}</span>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
          </div>
          <footer>
            <small>${tool.useCase}</small>
            <a class="tool-link" href="${tool.url}" target="_blank" rel="noopener noreferrer">開啟工具</a>
          </footer>
        </article>
      `
    )
    .join("");
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  renderFilters();
  renderTools();
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderTools();
});

renderFilters();
renderTools();
