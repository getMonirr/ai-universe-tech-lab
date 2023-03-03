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
    <div id="tool" class="w-full card card-compact bg-base-100 shadow-xl border p-6">
    <figure class="h-full"><img src=${image} alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title text-2xl font-semibold">Features</h2>
        <ul class="list-decimal list-inside font-normal text-base text-[#585858]">
        ${features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <hr class="my-4">
        <div class="card-actions justify-between items-center">
            <div class="space-y-4">
                <h3 class="font-semibold text-xl lg:text-2xl">${name}</h3>
                <p class="flex gap-4"><img src="./images/date-icon.svg" alt="date"><span
                        class="text-base font-normal" id="tool-date">${date}</span></p>
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
    const { description, pricing, features, integrations, image_link: images, accuracy, input_output_examples } = data;
    // description 
    setInnerHTMLById('m-description', '');
    setInnerHTMLById('m-description', description);

    // console.log(data);
    // if (pricing) {
    //     setInnerHTMLById('price-1', `${pricing[0]?.price ? pricing[0]?.price : 'free of cost'}`);
    //     setInnerHTMLById('plan-1', `${pricing[0].plan}`);
    // }

    // pricing
    const pricingContainer = document.getElementById('pricing-container');
    pricingContainer.innerHTML = '';
    if (pricing) {
        pricingContainer.innerHTML = `${pricing.map(p => {
            let color = '#000000';
            switch (p.plan) {
                case 'Basic':
                case 'Free':
                case 'Starter':
                    color = '#03A30A';
                    break;
                case 'Premium':
                case 'Pro':
                case 'Professional':
                    color = '#F28927';
                    break;
                case 'Enterprise':
                case 'Microsoft Advertising':
                    color = '#EB5757';
                    break;
            }
            return `
            <div class="bg-white rounded-lg p-2">
                <span style="color:${color}" class="font-bold text-base text-[#03A30A]">${p?.price === 'No cost' || p?.price === '0' ? 'free of cost/' : p.price}</span>
                <span style="color:${color}" class="font-bold text-base text-[#03A30A]">/${p?.plan}</span>
            </div>`
        }).join('')}
        `;
    } else {
        for (let i = 1; i <= 3; i++) {
            pricingContainer.innerHTML += `
            <div class="bg-white rounded-lg p-2">
                ${i === 1
                    ? '<span class="font-bold text-base text-[#03A30A]">free of cost/Basic</span>'
                    : (i === 2
                        ? '<span class="font-bold text-base text-[#F28927]">free of cost/Pro</span>'
                        : '<span class="font-bold text-base text-[#EB5757]">free of cost/EnterPrice</span>'
                    )
                }
            </div>
            `;
        }
    }
    //end pricing


    // features
    const modalFeature = document.getElementById('m-feature');
    modalFeature.innerHTML = '';
    if (features !== null) {
        for (const key in features) {
            modalFeature.innerHTML +=
                `<li>${features[key].feature_name}</li>`;
        }
    } else {
        setInnerHTMLById('m-feature', 'No data Found');
    }

    // integrations
    setInnerHTMLById('m-integrations', '');
    if (integrations !== null) {
        setInnerHTMLById('m-integrations', `${integrations.map(i => `<li>${i}</li>`).join('')}`)
    } else {
        setInnerHTMLById('m-integrations', `No Data Found`)
    }

    // modal image
    const modalImage = document.getElementById('m-image');
    modalImage.src = `${images[0]}`

    // modal accuracy
    setInnerHTMLById('m-accuracy', '')
    if (accuracy.score === null) {
        document.getElementById('accuracy-container').classList.add('hidden');
    } else {
        document.getElementById('accuracy-container').classList.remove('hidden');
        setInnerHTMLById('m-accuracy', `${(accuracy.score * 100)}% accuracy`)
    }

    // input_output_examples
    setInnerHTMLById('in-out-example', '');
    if (input_output_examples) {
        const list = input_output_examples.slice(0, 1).map(e => {
            return `
                        <h2 class="card-title text-lg lg:text-2xl font-semibold">${e.input}</h2>
                        <p>${e.output}</p>
                    `
        }).join('');
        setInnerHTMLById('in-out-example', list);
    } else {
        const list = `
                    <h2 class="card-title text-xl lg:text-2xl font-semibold">Can you give any example?</h2>
                    <p>No! Not Yet! Take a break!!!</p>
                `;
        setInnerHTMLById('in-out-example', list);
    }
}

// set data by id
const setInnerHTMLById = (id, value) => {
    document.getElementById(id).innerHTML = value;
}

// sort by date
let isDescending = true;
const handleSort = () => {
    // console.log('iam clicked');
    const tools = [...document.querySelectorAll('#tool')];
    // console.log(tools[1].querySelector('#tool-date').innerText);
    // tools.forEach(tool => {
    //     const value = tool.querySelector('#tool-date').innerText;
    //     const toolDate = new Date(value)
    //     console.log(toolDate - diffDate);
    // })
    tools.sort((a, b) => {
        const aValue = new Date(a.querySelector('#tool-date').innerText);
        const bValue = new Date(b.querySelector('#tool-date').innerText);

        if (aValue > bValue) {
            return isDescending ? 1 : - 1;
        } else if (aValue < bValue) {
            return isDescending ? -1 : 1;
        } else {
            return 0;
        }
    })
    // console.log(tools[1].querySelector('#tool-date').innerText);
    const toolsContainer = document.getElementById('tools-container');
    tools.forEach(tools => toolsContainer.appendChild(tools));
    isDescending = !isDescending;
}

setAiDataUI();