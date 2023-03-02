// global variable need
const toolsContainer = document.getElementById('tools-container');
// get all ai tools data
const getAllAiTools = async () => {
    showLoading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    return (data.data.tools)

}

// set ai tools data in UI
const setAiDataUI = async (showAll) => {

    const allAIData = await getAllAiTools();
    toolsContainer.innerHTML = '';
    seeMoreBtnShow(true);

    let selectedData = 6;
    showAll
        && (selectedData = allAIData.length)
        && seeMoreBtnShow(false);

    allAIData.slice(0, selectedData).forEach(tool => {
        showToolsUI(tool);
    });
    showLoading(false);

}


// show tools/card in UI
const showToolsUI = (tool) => {
    // destructuring
    const { image, features, name, id, published_in: date } = tool;

    // ui card generate
    toolsContainer.innerHTML += `
    <div class="w-full card card-compact bg-base-100 shadow-xl border p-6">
    <figure class="h-full"><img src=${image} alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title text-2xl font-semibold">Features</h2>
        <ul class="list-decimal list-inside font-normal text-base text-[#585858]">
        ${features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <hr class="my-4">
        <div class="card-actions justify-between items-center">
            <div class="space-y-4">
                <h3 class="font-semibold text-2xl">${name}</h3>
                <p class="flex gap-4"><img src="./images/date-icon.svg" alt="date"><span
                        class="text-base font-normal">${date}</span></p>
            </div>
            <label for="my-modal-3" class="btn bg-[#FEF7F7] border-0"><img src="./images/right-arrow.svg"
                    alt="see details"></label>
        </div>
    </div>
</div>
    `;
}

// show or hide loader
const showLoading = (isLoading) => {
    const loaderElement = document.getElementById('loader-element');
    isLoading
        ? loaderElement.classList.remove('hidden')
        : loaderElement.classList.add('hidden')

}
// see more button
document.getElementById('see-more-btn').addEventListener('click', (e) => {
    setAiDataUI('shoAll');
    seeMoreBtnShow(false);
})

// see more button show or hide
const seeMoreBtnShow = (isShowing) => {
    const seeMoreBtn = document.getElementById('see-more-btn');
    isShowing
        ? seeMoreBtn.classList.remove('hidden')
        : seeMoreBtn.classList.add('hidden');
}

setAiDataUI();