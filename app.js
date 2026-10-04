document.querySelector(".control-button span").onclick = function () {
  let yourName = prompt("What's Your Name ?");
  if (yourName == "" || yourName == null) {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-button").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, SecondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.fruits === SecondBlock.dataset.fruits) {
    firstBlock.classList.remove("is-flipped");
    SecondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    SecondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      SecondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

function flipBlock(selectedBlock) {
  if (selectedBlock.classList.contains("has-match")) {
    return;
  }
  selectedBlock.classList.add("is-flipped");

  let flippedCards = blocks.filter((card) =>
    card.classList.contains("is-flipped"),
  );

  if (flippedCards.length == 2) {
    stopClicking();
    checkMatchedBlocks(flippedCards[0], flippedCards[1]);
  }
}
