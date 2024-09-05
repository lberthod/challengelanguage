<script>
import { useToast } from 'vue-toastification';
import LoginFormComponent from '@/components/LoginFormComponent.vue';
import SignupFormComponent from '@/components/SignupFormComponent.vue';
import SocialLoginComponent from '@/components/SocialLoginComponent.vue';

export default {
  name: 'AuthView',
  components: {
    LoginFormComponent,
    SignupFormComponent,
    SocialLoginComponent
  },
  setup() {
    const toast = useToast();

    const handleLoginSuccess = () => {
      toast.success('Connexion réussie!');
    };

    const handleLoginError = () => {
      toast.error('Échec de la connexion. Veuillez réessayer.');
    };

    return {
      handleLoginSuccess,
      handleLoginError
    };
  }
}
</script>
