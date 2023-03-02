// get all ai tools data
const getAllAiTools = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    setAiDataUI(data.data.tools)
     
}

// set ai tools data in UI
const setAiDataUI = (data) => {
    data.forEach(tool => {
        showToolsUI(tool);
    });
}
getAllAiTools();

// show tools/card in UI
const showToolsUI = (tool) => {
    // destructuring
    const {image,features,name,id,published_in:date} = tool;
    console.log(tool);

    // ui card generate
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerHTML += `
    <div class="w-full card card-compact bg-base-100 shadow-xl border p-6">
    <figure><img src=${image} alt="Shoes" /></figure>
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