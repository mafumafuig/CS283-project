
const newBooks = [
  {
    id: 1,
    title: "Without Merit: A Novel",
    author: "Colleen Hoover",
    price: "400.00 EGP",
    img: "https://picsum.photos/seed/without/400/300",
  },
  {
    id: 2,
    title: "Black Beauty",
    author: "Anna Sewell",
    price: "280.00 EGP",
    img: "https://picsum.photos/seed/black/400/300",
  },
  {
    id: 3,
    title: "Ugly Love: A Novel",
    author: "Colleen Hoover",
    price: "550.00 EGP",
    img: "https://picsum.photos/seed/ugly/400/300",
  },
  {
    id: 4,
    title: "American Dirt",
    author: "Jeanine Cummins",
    price: "350.00 EGP",
    img: "https://picsum.photos/seed/american/400/300",
  },
];

const usedBooks = [
  {
    id: 11,
    title: "The Name of the Rose",
    author: "Umberto Eco",
    price: "150.00 EGP",
    img: "https://picsum.photos/seed/rose/400/300",
  },
  {
    id: 12,
    title: "Twilight: Director's Notebook",
    author: "Catherine Hardwicke",
    price: "300.00 EGP",
    img: "https://picsum.photos/seed/twilight/400/300",
  },
  {
    id: 13,
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    price: "750.00 EGP",
    img: "https://picsum.photos/seed/hp/400/300",
  },
  {
    id: 14,
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    price: "200.00 EGP",
    img: "https://picsum.photos/seed/heart/400/300",
  },
];


const cart = new Map();

function addToCart(id, title, price) {
  const key = id.toString();
  const prev = cart.get(key) || { title, price, qty: 0 };
  prev.qty++;
  cart.set(key, prev);
  updateCartCount();
  showToast(`"${title}" أضيفت إلى السلة`);
}

function updateCartCount() {
  let sum = 0;
  for (const v of cart.values()) sum += v.qty;
  document.getElementById("cartCount").textContent = sum;
}


function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText =
    "position:fixed;left:20px;bottom:20px;background:#0b2540;color:white;padding:10px 14px;border-radius:10px;box-shadow:0 8px 30px rgba(2,6,23,0.3);z-index:999;font-size:14px;";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}



function escapeHtml(str) {
  return str.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

function createCard(book) {
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <div class="thumb" style="background-image:url('${book.img}')"></div>
    <div class="meta">
      <div class="title">${book.title}</div>
      <div class="author">${book.author}</div>
      <div class="price">${book.price}</div>
    </div>
    <div class="card-actions">
      <button class="btn" onclick="addToCart(${book.id}, '${escapeHtml(
    book.title
  )}', '${book.price}')">Add to Cart</button>
      <button class="btn ghost" onclick="quickView(${book.id})">Quick View</button>
    </div>
  `;
  return el;
}

function renderGrid(list, gridId) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = "";
  list.forEach((b) => grid.appendChild(createCard(b)));
}

window.addEventListener("DOMContentLoaded", () => {
  renderGrid(newBooks, "newGrid");
  renderGrid(usedBooks, "usedGrid");

 
  document
    .getElementById("loginBtn")
    .addEventListener("click", () => alert("نموذج تسجيل الدخول (قريبًا)"));
});


function quickView(id) {
  const all = [...newBooks, ...usedBooks];
  const book = all.find((b) => b.id === id);
  if (!book) return alert("لم يتم العثور على الكتاب.");
  alert(`${book.title}\n${book.author}\nالسعر: ${book.price}`);
}

function loadMore(type) {
 
  const target = type === "new" ? newBooks : usedBooks;
  const nextId = Date.now() % 10000;
  target.push({
    id: nextId,
    title: "More Book #" + nextId,
    author: "Various",
    price: "200.00 EGP",
    img: "https://picsum.photos/seed/" + nextId + "/400/300",
  });
  renderGrid(target, type === "new" ? "newGrid" : "usedGrid");
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}