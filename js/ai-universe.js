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
            <label onclick="handleModalDetails('${id}')" for="AI-modal" class="btn bg-[#FEF7F7] border-0"><img src="./images/right-arrow.svg"
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

// handle modal details 
const handleModalDetails = async (id) => {
    showLoading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    setModalData(data.data);
    showLoading(false);
}


// handle modal 
const setModalData = (data) => {
    const { description, pricing, features, integrations } = data;
    setInnerHTMLById('m-description', description);

    // if (pricing) {
    //     setInnerHTMLById('price-1', `${pricing[0]?.price ? pricing[0]?.price : 'free of cost'}`);
    //     setInnerHTMLById('plan-1', `${pricing[0].plan}`);
    // }

    // pricing
    // const pricingContainer = document.getElementById('pricing-container');
    // pricingContainer.innerHTML = '';
    // if (pricing) {

    //     pricingContainer.innerHTML = `${pricing.map(p => {
    //         let color = '#000000'; // default color
    //         switch (p.plan) {
    //             case 'Basic', 'Free':
    //                 color = '#FF0000';
    //                 break;
    //             case 'Premium':
    //                 color = '#00FF00';
    //                 break;
    //             case 'Pro':
    //                 color = '#0000FF';
    //                 break;
    //         }
    //         console.log(p);
    //         return `
    //         <div class="bg-white rounded-lg p-2">
    //             <span style="color:${color}" class="font-bold text-base text-[#03A30A]">${p?.price === 'No cost' || p?.price === '0' ? 'free of cost/' : p.price}</span>
    //             <span style="color:${color}" class="font-bold text-base text-[#03A30A]">${p?.plan}</span>
    //         </div>`
    //     }).join('')}
    //     `;
    // } else {
    //     for (let i = 1; i <= 3; i++) {
    //         pricingContainer.innerHTML += `
    //         <div class="bg-white rounded-lg p-2">
    //             <span class="font-bold text-base text-[#03A30A]">free of cost /</span>
    //             <span class="font-bold text-base text-[#03A30A]">${i === 1 ? 'Basic' : (i === 2 ? 'Pro' : 'enterPrice')}</span>
    //         </div>
    //         `;
    //     }
    // }
    //end pricing


    // features
    // const modalFeature = document.getElementById('m-feature');
    // console.log(features);
    // modalFeature.innerHTML += `

    // `;

    const modalIntegrations = document.getElementById('m-integrations');
    if (integrations !== null) {
        setInnerHTMLById('m-integrations', '');
        setInnerHTMLById('m-integrations', `${integrations.map(i => `<li>${i}</li>`).join('')}`)
    } else {
        setInnerHTMLById('m-integrations', '');
        setInnerHTMLById('m-integrations', `No Data Found`)
    }


}

// set data by id
const setInnerHTMLById = (id, value) => {
    document.getElementById(id).innerHTML = value;
}


setAiDataUI();