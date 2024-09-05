<template>
  <div class="home">
    <HeroBannerComponent />
    <FeaturesListComponent />
    <CallToActionComponent />
  </div>
</template>

<script>
import HeroBannerComponent from '@/components/HeroBannerComponent.vue';
import FeaturesListComponent from '@/components/FeaturesListComponent.vue';
import CallToActionComponent from '@/components/CallToActionComponent.vue';

export default {
  name: 'HomeView',
  components: {
    HeroBannerComponent,
    FeaturesListComponent,
    CallToActionComponent
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
