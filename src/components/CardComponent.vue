<template>
    <div class="card" :class="{ 'is-flipped': isFlipped, 'is-matched': isMatched }" @click="flipCard">
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">{{ word }} ({{ translationId }})</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardComponent',
    props: {
      word: {
        type: String,
        required: true
      },
      isFlipped: {
        type: Boolean,
        default: false
      },
      isMatched: {
        type: Boolean,
        default: false
      },
      translationId: {
        type: String,
        required: true
      }
    },
    methods: {
      flipCard() {
        if (!this.isFlipped && !this.isMatched) {
          this.$emit('flip', { word: this.word, translationId: this.translationId });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    width: 100px;
    height: 150px;
    perspective: 1000px;
  }
  
  .card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .is-flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front, .card-back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 5px;
  }
  
  .card-front {
    background-color: #42b983;
    color: white;
  }
  
  .card-back {
    background-color: white;
    color: black;
    transform: rotateY(180deg);
  }
  
  .is-matched .card-back {
    background-color: lightgreen;
  }
  </style>
  