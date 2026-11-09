const state = { hide: null, asked: false };
const TOTAL_ENDINGS = 5;
const found = new Set();
try { JSON.parse(localStorage.getItem("mw-endings") || "[]").forEach(e => found.add(e)); } catch (e) {}
function saveFound(id) {
  found.add(id);
  try { localStorage.setItem("mw-endings", JSON.stringify([...found])); } catch (e) {}
}

// writing helpers
const note = (word, n) => `<span class="w" data-n="${n}">${word}</span>`;
const her = (line, inner) => `<span class="her" data-w="${inner}">${line}</span>`;

const HIDE_TEXT = {
  stack: "beneath the stack of corn",
  aisins: "up in the rafters above the bed",
  kist: "in the locked kist; the key was never as hidden as you thought"
};

// choice fields: go, a (label), b (label on hover), img, imgB, x, y, w (% of screen), set, small
const scenes = {

  title: () => ({
    head: `<h1>The Mermaid Wife</h1>
      <p class="sub">after a tale told on Unst, the northmost of the Shetland Isles</p>`,
    choices: [
      { go: "shore", img: "voe.jpg", imgB: "seal-1.png", pop: { x: 10, y: 40, w: 36 }, a: "the voe, at night", b: "something strange is happening near the water's edge...", x: 68, y: 10, w: 24 },
      { go: "about", a: "about", b: "about this piece", x: 8, y: 88, small: true }
    ]
  }),

  shore: () => ({
    head: `<p>A summer night, the kind they call the ${note("simmer dim", "simmer dim: the long Shetland summer twilight, when the sky never fully darkens.")}.
      You walk the sand at the edge of the ${note("voe", "voe: a long, narrow sea inlet, from Old Norse vágr. Shetland was Norwegian until 1469.")}.</p>
      <p>People are dancing ahead of you...too many people for this hour and this shore. But strangely, their feet leave no prints.</p>
      <p>On the rocks beside them lie ${note("skins", "The sea-folk travel in the skins of the larger seals, and each has only one. If they lose it, they can never go back below. (Keightley, after Hibbert)")}, folded like coats on a closet shelf.</p>`,
    choices: [
      { go: "plea", a: "get closer to them", b: "this isn't a dream", x: 60, y: 54 },
      { go: "end_watch", a: "go to the dunes", b: "stay hidden...just watch.", x: 14, y: 76 }
    ]
  }),

  plea: () => ({
    whisperAt: [62, 44], decor: [{ img: "mermaid-1.jpeg", x: 60, y: 8, w: 22 }],
    head: `<p>They see you and run. At the rocks each one pulls on a skin and is gone...nothing but dark heads in dark water within seconds.</p>
      <p>One skin is left at your feet. You ${note("pick it up", "Motif D361.1, Swan Maiden: a man steals a supernatural woman's skin or robe and she must stay with him. Motif F302.4.2: she is in his power while he holds it.")}.</p>
      <p>A woman walks back up the sand. She is the most beautiful thing you have ever seen, and she is crying.</p>
      <p class="speech">${her("“That is mine. Give it back.”", "my mother is out there. my sisters. he is out there.")}</p>
      <p class="speech">${her("“Without it I can never go home.”", "the cold is coming up through my feet. I have never had feet this long.")}</p>`,
    choices: [
      { go: "end_returned", a: "her hands", b: "give it back", x: 70, y: 66 },
      { go: "years", a: "hold onto the skin", b: "you want her to stay", x: 22, y: 84 }
    ]
  }),

  years: () => ({
    whisperAt: [68, 12],
    head: `<p>She has no choice...and you both know it. You marry. She keeps your ${note("croft", "croft: a small tenant farm. Shetland crofters farmed and fished; the men went to sea while the women worked the land.")}, cards the wool, and never once sings.</p>
      <p>${her("Years go by.", "I count the waves instead of the days. it is easier.")} ${her("She is kind to you, but cold.", "he is not cruel. that is the worst of it. there is no one to hate.")}</p>
      <p>The skin has to be somewhere she will never look.</p>`,
    choices: [
      { go: "seal", set: "hide:stack", img: "stack.jpg", imgB: "stack.jpg", a: "the corn stack", b: "she would never look here", x: 12, y: 56, w: 21 },
      { go: "seal", set: "hide:aisins", img: "rafters-2.jpg", imgB: "rafters-2.jpg", a: "the rafters", b: "above the bed where she sleeps", x: 41, y: 23, w: 14 },
      { go: "seal", set: "hide:kist", img: "kist.jpg", imgB: "kist.jpg", a: "the kist", b: "locked, and the key in your pocket", x: 62, y: 58, w: 22 }
    ]
  }),

  seal: () => ({
    whisperAt: [60, 76],
    head: `<p>Some evenings she walks down to the beach alone. Once you follow, and stand where she can't see you.</p>
      <p>She makes a sound you have never heard her make. Out in the voe, a great seal lifts its head. They talk for a long time in a language you don't know.</p>
      <p>Your children are quick and dark-eyed, with ${note("a thin web between their fingers.", "The children kept no trace of the sea but a thin web between the fingers and a seal-like bend of the hands, marks said to still run in the family.")}</p>`,
    choices: [
      { go: "finding", img: "seal-2.jpeg", imgB: "seal-2.jpeg", a: "a seal in the voe", b: "it is looking at you", x: 54, y: 34, w: 32 },
      { go: "ask", set: "asked:true", a: "her face, that night", b: "ask her what he said", x: 16, y: 72 }
    ]
  }),

  ask: () => ({
    head: `<p>She is quiet so long you think she won't answer.</p>
      <p class="speech">“He says the tide is the same as it was. He says they have kept my place.”</p>
      <p class="speech">“Do you want to go?”</p>
      <p>She looks at you as if you had asked whether she wanted to breathe.</p>`,
    choices: [
      { go: "finding", a: "morning", b: "go fishing", x: 30, y: 78 }
    ]
  }),

  finding: () => ({
    head: `<p>You are out at the ${note("haaf", "the haaf: deep-sea fishing far offshore in open six-oared boats (sixareens). Men could be gone for days.")} with the other men when it happens.</p>
      <p>At home your youngest, playing, finds something ${HIDE_TEXT[state.hide] || HIDE_TEXT.stack}.</p>
      <p class="speech">“Mom, look. A ${note("coat", "It doesn't matter where you hid it. In every telling, a child finds it. Hibbert's Shetland son finds it under a corn stack; in Dennison's Orkney 'Goodman o' Wastness' the youngest daughter shows her mother the rafters.")}. It's so soft.”</p>`,
    choices: [
      { go: "end_empty", img: "boat.jpg", imgB: "boat.jpg", a: "the boat", b: "keep to the lines. it is only a figure.", x: 66, y: 30, w: 21 },
      { go: "confront", a: "a small figure on the shore", b: "row for land", x: 28, y: 84 }
    ]
  }),

  confront: () => ({
    whisperAt: [58, 14],
    head: `<p>You pull until your hands bleed. When you reach the rocks she is on the ledge, the skin half over her shoulders.</p>
      <p>${her("She sees you.", "not now...not when I am this close.")}</p>
      <p>You could still reach it.</p>`,
    choices: [
      { go: "end_kept", a: "the skin", b: "take hold of it", x: 12, y: 66 },
      { go: "end_farewell", a: "the water", b: "let her go", x: 60, y: 48 }
    ]
  }),

  // endings
  end_watch: () => ending("THE DUNES", "",
    `<p>You stay in the dunes. They dance until the light changes, then step back into their skins and go out to sea.</p>
     <p>You never tell anyone. Some nights you aren't sure it ever happened.</p>
     <p>It is the only version of this story where everyone goes back home.</p>`),

  end_returned: () => ending("THE UNTOLD TALE", "",
    `<p>She takes it from your hands without touching them. At the water's edge she looks back once.</p>
     <p>No one on Unst ever told this story. Nothing happened in it.</p>
     <p>But for the rest of your life, when you walk the voe, a seal comes into the shallows and watches you, and doesn't swim away.</p>`,
    "thank you."),

  end_kept: () => ending("THE KEEPING", "kept",
    `<p>You get your hand on the skin. It tears a little, and the moment it tears she stops fighting.</p>
     <p>This time you hide it where no child will ever find it.</p>
     <p>She stays. She lives with you forty years. She is never unkind, and never once happy.</p>
     <p>The sea is still out there. You have only stopped being able to see it...</p>`),

  end_farewell: () => ending("THE TALE AS IT WAS TOLD", "released",
    `<p>The skin closes over her shoulders. She looks at you, and at the children on the sand behind you.</p>
     ${state.asked ? `<p class="speech">“You asked me once what I wanted. I will remember that.”</p>` : ""}
     <p class="speech">${note("“Farewell! and may all good attend you. I loved you very well when I resided upon earth, but I always loved my first husband much better.”", "Her farewell exactly as Hibbert recorded it in 1822. It is the only time the source tale lets her speak.")}</p>
     <p>Beyond the skerry the large seal is waiting. They go out together.</p>`),

  end_empty: () => ending("THE EMPTY SHORE", "",
    `<p>You come in at dark with the catch. The house is cold.</p>
     <p>The children are at the fire, murmuring about a soft coat.</p>
     <p>You run to the shore. Nothing on the rocks. Far out, two seals float at the surface, and then disappear.</p>`),

  about: () => ({
    head: `<p class="sub">about</p>
      <p>A clickable retelling of <em>The Mermaid Wife</em>, a seal-woman legend from Unst, Shetland (Swan Maiden tale, ATU 400 / 400*; Christiansen ML 4080, “The Seal Woman”).</p>
      <p>Hover her words and her unspoken thoughts drift onto the page. Hover a choice and it becomes what it means. Inspired by Olia Lialina's <em>My Boyfriend Came Back from the War</em> (1996), Shelley Jackson's <em>my body — a Wunderkammer</em> (1997), and JODI's <em>wwwwwwwww.jodi.org</em> (1995).</p>
      <ul class="sources">
        <li>Hibbert, Samuel. <em>A Description of the Shetland Islands</em>. Edinburgh, 1822.</li>
        <li>Keightley, Thomas. <em>The Fairy Mythology</em>. London, 1850.</li>
        <li>Tibbitts, Charles John. <em>Folk-Lore and Legends: Scotland</em>. London: W. W. Gibbings, 1889.</li>
        <li>Dennison, Walter Traill. “The Goodman o' Wastness.” Orkney, 1890s.</li>
        <li>Ashliman, D. L. <em>The Mermaid Wife</em> (ML 4080). sites.pitt.edu/~dash/type4080.html</li>
        <li>Images: Guérard, Moonlight in the Harbor at Dieppe, c. 1885 (public domain, via the National Gallery of Art); watercolor seal illustration: Kateryna - Adobe Stock; silhouette shot of a mermaid swimming: Delmaine Donson/peopleimages.com - Adobe Stock; two brown hay stacks: Roman Synkevych - Unsplash; brown and white wooden ceiling: Charlotte Groß-Hohnacker - Unsplash;
        antique chest: Aysegul Aytören - Unsplash; gray seal sketch: Henry W. Elliott - Wikimedia Commons; boat - Public Domain</li>
      </ul>`,
    choices: [{ go: "title", a: "back", b: "back to the shore", x: 70, y: 82 }]
  })
};

function ending(title, tone, body, whisper) {
  const n = found.size + (found.has(title) ? 0 : 1);
  return {
    ending: title, tone,
    whisperAt: [64, 62], whisperFixed: whisper,
    head: body + `<p class="ending-title">${title}</p>
      <p class="small">${Math.min(n, TOTAL_ENDINGS)} of ${TOTAL_ENDINGS} endings</p>`,
    choices: [
      { go: "title", a: "again", b: "walk down to the voe again", x: 62, y: 80 },
      { go: "about", a: "about", b: "about this piece", x: 8, y: 92, small: true }
    ]
  };
}

// rendering
const stage = document.getElementById("stage");
const noteEl = document.getElementById("note");
const jitter = () => (Math.random() * 4 - 2).toFixed(1); // small drift so the page never sits quite the same

function choiceHTML(c) {
  const cls = ["choice", c.img ? "" : "text", c.small ? "small" : ""].join(" ");
  const pos = `left:${+c.x + +jitter()}%;top:${+c.y + +jitter()}%;${c.w ? `width:${c.w}%;` : ""}`;
  // pop: the hover image appears somewhere else on the page instead of replacing the first one
  const popId = c.pop ? `pop-${c.go}` : "";
  const pop = c.pop ? `<img class="pop" id="${popId}" src="images/${c.imgB}" alt="${c.b}"
    style="left:${c.pop.x}%;top:${c.pop.y}%;width:${c.pop.w}%" onerror="this.remove()">` : "";
  const hoverSrc = c.pop ? c.img : (c.imgB || c.img);
  const img = c.img ? `<img src="images/${c.img}" data-a="images/${c.img}" data-b="images/${hoverSrc}" alt="${c.a}">` : "";
  return pop + `<a class="${cls}" style="${pos}" data-go="${c.go}" ${c.set ? `data-set="${c.set}"` : ""} ${popId ? `data-pop="${popId}"` : ""}>
    ${img}<span class="label"><span class="la">${c.a}</span><span class="lb" aria-hidden="true">${c.b || c.a}</span></span></a>`;
}

function render(id) {
  if (id === "title") { state.hide = null; state.asked = false; } try { history.replaceState(null, "", "#" + id); } catch (e) {}
  const s = scenes[id]();
  if (s.ending) saveFound(s.ending);
  document.body.className = s.tone || "";
  const [wx, wy] = s.whisperAt || [64, 60];
  stage.innerHTML =
    `<div class="head">${s.head}</div>` +
    `<div id="whisper" class="${s.whisperFixed ? "on" : ""}" style="left:${wx}%;top:${wy}%">${s.whisperFixed || ""}</div>` +
    s.choices.map(choiceHTML).join("") +
    (s.decor || []).map(d => `<img class="decor" src="images/${d.img}" alt="" style="left:${d.x}%;top:${d.y}%;width:${d.w}%" onerror="this.remove()">`).join("");
  noteEl.classList.remove("on");
  stage.querySelectorAll(".choice img").forEach(img => {
    const c = img.closest(".choice");
    img.onerror = () => c.classList.add("missing");
    const b = new Image(); b.onerror = () => c.classList.add("missing"); b.src = img.dataset.b;
  });
  window.scrollTo(0, 0);
}

function morph(c, toB) {
  const img = c.querySelector("img"), k = toB ? "b" : "a";
  if (img && !c.classList.contains("missing")) img.src = img.dataset[k];
  c.classList.toggle("on", toB); // both labels are stacked; CSS crossfades them
  const pop = c.dataset.pop && document.getElementById(c.dataset.pop);
  if (pop) pop.classList.toggle("on", toB);
}

document.addEventListener("mouseover", e => {
  const w = e.target.closest(".w");
  if (w) { noteEl.textContent = w.dataset.n; noteEl.classList.add("on"); }
  const h = e.target.closest(".her"), wh = document.getElementById("whisper");
  if (h && wh) { wh.textContent = h.dataset.w; wh.classList.add("on"); }
  const c = e.target.closest(".choice");
  if (c && !c.contains(e.relatedTarget)) morph(c, true);
});
document.addEventListener("mouseout", e => {
  if (e.target.closest(".w")) noteEl.classList.remove("on");
  const h = e.target.closest(".her"), wh = document.getElementById("whisper");
  if (h && wh && !h.contains(e.relatedTarget)) wh.classList.remove("on");
  const c = e.target.closest(".choice");
  if (c && !c.contains(e.relatedTarget)) morph(c, false);
});

document.addEventListener("click", e => {
  const c = e.target.closest(".choice");
  if (c) {
    e.preventDefault();
    // on touch screens the first tap reveals the hidden meaning, the second tap follows it
    if (matchMedia("(hover: none)").matches && !c.dataset.armed) { c.dataset.armed = 1; morph(c, true); return; }
    if (c.dataset.set) { const [k, v] = c.dataset.set.split(":"); state[k] = v === "true" ? true : v; }
    render(c.dataset.go);
    return;
  }
  const w = e.target.closest(".w");
  if (w) { noteEl.textContent = w.dataset.n; noteEl.classList.toggle("on"); }
  const h = e.target.closest(".her"), wh = document.getElementById("whisper");
  if (h && wh) { wh.textContent = h.dataset.w; wh.classList.toggle("on"); }
});

render(scenes[location.hash.slice(1)] ? location.hash.slice(1) : "title");