// const axios = require("axios");
// const ethers = require("ethers");

const APIConsumerAddress = "0xb16E68F8d0C735f97baE59F4Fc6548F00f3f8a71"; // Replace with the deployed address
const APIConsumerABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_linkTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mockOracleAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "volume",
        type: "string",
      },
    ],
    name: "RequestVolume",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_volume",
        type: "string",
      },
    ],
    name: "fulfill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "logdata",
    outputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "requestVolumeData",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "volume",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Declare variables
let provider;
let signer;
let apiConsumerContract;

document.getElementById("productPage").onclick = () => {
  window.location.href = "user_form.html";
};

// Initialize ethers.js provider
async function initializeEthers() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    apiConsumerContract = new ethers.Contract(
      APIConsumerAddress,
      APIConsumerABI,
      signer
    );
  } else {
    alert("Ethereum provider not found! Please install MetaMask.");
  }
}

document.getElementById("addUser").addEventListener("click", async () => {
  try {
    // Gửi yêu cầu GET đến API
    const response = await axios.get("http://localhost:8080/api/v1/customers");
    
    // Lấy dữ liệu khách hàng từ API
    const customers = response.data.data.customers;
    console.log("Customers:", customers);

    // Hiển thị dữ liệu vào giao diện
    displayCustomers(customers);
  } catch (error) {
    console.error("Error fetching data:", error);
    showToast("Lỗi khi lấy dữ liệu");
  }
});

// Hàm hiển thị thông tin khách hàng
function displayCustomers(customers) {
  const userListContainer = document.getElementById("userList");

  // Làm sạch giao diện trước khi hiển thị dữ liệu mới
  userListContainer.innerHTML = "";

  if (customers && customers.length > 0) {
    customers.forEach((customer) => {
      const customerDiv = document.createElement("div");
      customerDiv.classList.add("user-item");

      customerDiv.innerHTML = `
        <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <hr>
      `;

      userListContainer.appendChild(customerDiv);
    });
  } else {
    userListContainer.innerHTML = "<p>No customers found</p>";
  }
}

// Hàm hiển thị thông báo Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


