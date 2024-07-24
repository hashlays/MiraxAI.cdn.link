class MiraxAIProduct {
    constructor(appId, appKey, TypeID, ProductID, lat, lang, customerDetails) {
        this.appId = appId;
        this.appKey = appKey;
        this.TypeID = TypeID;
        this.ProductID = ProductID;
        this.lat = lat;
        this.lang = lang;
        this.launchurl = "";
        this.iframe = null;
        this.url = "https://product.hashlays.com";
        this.customerDetails = customerDetails;
        if (TypeID == "1") {
            this.component = "jwellery";
          } else if (TypeID == "2") {
            this.component = "cosmatics";
          } else if (TypeID == "3") {
            this.component = "hands";
          } else if (TypeID == "4") {
            this.component = "faceais";
          }
    }

    receiveData(callback = null) {
        // Show loading indicator
        this.showLoadingIndicator();

        this.iframe = document.createElement("iframe");
        this.iframe.style.position = "fixed";
        this.iframe.style.inset = 0;
        this.iframe.width = "100%";
        this.iframe.height = "100%";
        this.iframe.style.border = "none";
        this.iframe.setAttribute("allow", "microphone; camera ");
        document.body.appendChild(this.iframe);

        this.launchurl = `${this.url}/product/${this.component}?TypeId=${this.TypeID}&ProductId=${this.ProductID}&AppKey=${this.appKey}&AppId=${this.appId}&lat=${this.lat}&lang=${this.lang}&name=${this.customerDetails.name}&customerId=${this.customerDetails.customerId}&email=${this.customerDetails.email}&firstName=${this.customerDetails.firstName}&lastName=${this.customerDetails.lastName}&city=${this.customerDetails.city}&state=${this.customerDetails.state}&postalCode=${this.customerDetails.postalCode}&phoneNumber=${this.customerDetails.phonenumber}&country=${this.customerDetails.country}`;
        this.iframe.src = this.launchurl;

        this.iframe.onload = () => {
            // Remove loading indicator when iframe is fully loaded
            this.hideLoadingIndicator();
        };

        window.addEventListener("message", this.handleMessage.bind(this));
        this.sendMessageToIframe();
    }

    handleMessage(event) {
        if (event.origin !== this.url) return;
        const data = event.data;
        console.log("Data received from iframe:", data);
    }

    sendMessageToIframe() {
        if (!this.iframe || !this.iframe.contentWindow) {
            console.error("Iframe is not ready");
            return;
        }
        const message = {
            appId: this.appId,
            appKey: this.appKey,
            customerDetails: this.customerDetails
        };
        this.iframe.contentWindow.postMessage(message, this.url);
    }

    showLoadingIndicator() {
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "loadingIndicator";
        loadingDiv.style.position = "fixed";
        loadingDiv.style.top = "0";
        loadingDiv.style.left = "0";
        loadingDiv.style.width = "100%";
        loadingDiv.style.height = "100%";
        loadingDiv.style.display = "flex";
        loadingDiv.style.flexDirection="column";
        loadingDiv.style.alignItems = "center";
        loadingDiv.style.justifyContent = "center";
        loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
        loadingDiv.style.backdropFilter = "blur(5px)";
        loadingDiv.style.zIndex = "1000";
        // Add vendor prefixes for compatibility
        loadingDiv.style.webkitBackdropFilter = "blur(5px)"; // Safari
        loadingDiv.style.backdropFilter = "blur(5px)";

        // Fallback for browsers that do not support backdrop-filter
        if (!('backdropFilter' in document.body.style) && !('webkitBackdropFilter' in document.body.style)) {
            loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.15)"; // Increase opacity for better visibility without blur
        }

        const bounceDiv = document.createElement("div");
        bounceDiv.className = "bounce";

        const logoImg = document.createElement("img");
        logoImg.src = "https://hashlays.com/logo512.png";
        logoImg.alt = "Loading...";
        logoImg.style.height = "60px";
        logoImg.style.width = "60px";
        logoImg.style.animation = "heartbeat 1s infinite";

        bounceDiv.appendChild(logoImg);
        loadingDiv.appendChild(bounceDiv);

        const loadingText = document.createElement("p");
        loadingText.style.color = "black";
        loadingText.style.fontSize = "1.25rem";
        loadingText.style.padding = "0.5rem";
        loadingText.textContent = "Loading...";

        loadingDiv.appendChild(loadingText);
        document.body.appendChild(loadingDiv);
    }

    hideLoadingIndicator() {
        const loadingDiv = document.getElementById("loadingIndicator");
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }
    }
}

function sendDataToMiraxAIProduct(appId, appKey, TypeID, ProductID, lat, lang, customerDetails, callback) {
    const miraxAIProduct = new MiraxAIProduct(appId, appKey, TypeID, ProductID, lat, lang, customerDetails);
    miraxAIProduct.receiveData(callback);
}

// Example of how to use the function
// sendDataToMiraxAIProduct("yourAppId", "yourAppKey", "4", "yourProductID", "yourLat", "yourLang", customerDetails, () => {
//     console.log("Data sent to MiraxAIProduct");
// });

// CSS for bounce animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}
    @keyframes heartbeat {
    0% {
        transform: scale(1);
    }
  
    50% {
        transform: scale(2);
    }
    100% {
     transform: scale(1);
    }
}
`;
document.head.appendChild(style);
