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
      this.url = "http://localhost:3000";
      this.customerDetails = customerDetails;
      if (TypeID == "1") {
        this.component = "jewellery";
      } else if (TypeID == "2") {
        this.component = "cosmetics";
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
      this.iframe.setAttribute("allow","microphone; camera ");
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
    //   console.log(this.customerDetails)
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
      loadingDiv.style.alignItems = "center";
      loadingDiv.style.justifyContent = "center";
      loadingDiv.style.zIndex = "1000";
  
      // Circular progress indicator
      const spinner = document.createElement("div");
      spinner.className = "spinner";
  
      loadingDiv.appendChild(spinner);
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
  
  // CSS for spinner
  const style = document.createElement("style");
  style.innerHTML = `
  .spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  `;
  document.head.appendChild(style);

  // Example of how to use the function

  
//   sendDataToMiraxAIProduct("yourAppId", "yourAppKey", "4", "yourProductID", "yourLat", "yourLang", customerDetails, () => {
//     console.log("Data sent to MiraxAIProduct");
//   });
