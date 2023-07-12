document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.changecolorbtn');
    const colorgrid = document.querySelector('.colorgrid');
    const colorvalue = document.querySelector('.colorvalue');

    btn.addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: pickcolor,
        },async(injectionResults) => {
            const[data]=injectionResults;
            if(data.result){
                const color=data.result.sRGBHex;
                colorgrid.style.backgroundColor=color;
                colorvalue.innerText=color;
                try{
                    await navigator.clipboard.writeText(color);
                }
                catch(err){
                    console.log(err);
                }
            }
        });
    });
});

async function pickcolor() {
    try{
        //Picker
        const eyeDropper=new EyeDropper();
        return await eyeDropper.open();
    }
    catch(err){
    console.log(err);
    }
}
