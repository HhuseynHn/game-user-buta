class LogoService {
  data = {
    imagePath:
      "https://img.freepik.com/ucretsiz-vektor/kus-renkli-logo-gradyan-vektoru_343694-1365.jpg?semt=ais_hybrid&w=740&q=80",
  };

  async get() {
    return this.data;
  }
}

export const logoService = new LogoService();
