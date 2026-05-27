const tools = [
  {
    name: "圖片設計優化指令",
    category: "圖片設計",
    useCase: "參考圖延伸",
    description: "可以丟參考圖，請 AI 按照相同風格產出，適合做圖片風格延伸與設計提示。",
    url: "https://chatgpt.com/g/g-6a0139f4caac819189c3e6421747f40d-tu-pian-she-ji-you-hua-zhi-ling"
  },
  {
    name: "社群 / 品牌文案發想工具",
    category: "社群文案",
    useCase: "內容發想",
    description: "直接輸入「請教我如何開始」，AI 會引導你整理品牌、主題與社群文案方向。",
    url: "https://chatgpt.com/g/g-6a056611971c819193c31db559ebe768-she-qun-pin-pai-wen-an-fa-xiang-gong-ju"
  },
  {
    name: "Ellie 放心說 - 文案產生器",
    category: "文案調整",
    useCase: "專屬文案工具",
    description: "專屬的文案調整工具，適合把已有內容改得更自然、更清楚、更貼近想說的語氣。",
    url: "https://chatgpt.com/g/g-6a018b32bb7881919fe467733cfd5e78-ellie-fang-xin-shuo-wen-an-chan-sheng-qi"
  }
];

const toolsGrid = document.querySelector("#toolsGrid");
const filterRow = document.querySelector("#filterRow");
const allCategory = "全部";
const categories = [allCategory, ...new Set(tools.map((tool) => tool.category))];
let activeCategory = allCategory;

function renderFilters() {
  filterRow.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-button ${category === activeCategory ? "is-active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");
}

function renderTools() {
  const visibleTools =
    activeCategory === allCategory ? tools : tools.filter((tool) => tool.category === activeCategory);

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
            <a class="tool-link" href="${tool.url}" target="_blank" rel="noopener noreferrer">開啟使用</a>
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

renderFilters();
renderTools();
