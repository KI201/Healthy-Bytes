<template>
    <div class="events-page">
      <h1 class="header">Upcoming Fundraising Events</h1>
  
      <p class="intro">
        Join us for these exciting events to raise awareness and funds for melanoma research.
      </p>
  
      <div class="event-list">
        <div class="event-card">
          <h3>Sunshine 5K Fun Run</h3>
          <p><strong>Date:</strong> May 12, 2025</p>
          <p><strong>Location:</strong> Bondi Beach, Sydney</p>
          <p>Run by the sea and support early detection programs for skin cancer.</p>
        </div>
  
        <div class="event-card">
          <h3>Melanoma Awareness Walk</h3>
          <p><strong>Date:</strong> June 8, 2025</p>
          <p><strong>Location:</strong> Royal Botanic Gardens, Melbourne</p>
          <p>A peaceful morning walk with family and friends in support of treatment research.</p>
        </div>
  
        <div class="event-card">
          <h3>Outrun the Sun Challenge</h3>
          <p><strong>Date:</strong> July 20, 2025</p>
          <p><strong>Location:</strong> South Bank Parklands, Brisbane</p>
          <p>Race to beat the sunrise and raise funds for youth skin safety education.</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .events-page {
    background-color: white;
    color: black;
    padding: 2rem;
    text-align: center;
  }
  
  .header {
    background-color: orangered;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }
  
  .intro {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
  
  .event-list {
    margin-top: 2rem;
    display: grid;
    gap: 1.5rem;
  }
  
  .event-card {
    border: 2px solid orangered;
    padding: 1rem;
    border-radius: 10px;
  }
  
  .event-card h3 {
    color: orangered;
    margin-bottom: 0.5rem;
  }
  </style>
  