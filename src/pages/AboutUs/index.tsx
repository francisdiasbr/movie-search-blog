import { Layout } from '../../components/Layout';

export default function AboutUs() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quem Somos</h1>
        <p className="text-lg">Que bom que você está aqui!</p>
        <p className="text-lg">Este blog surgiu da necessidade de catalogar os filmes que eu assisti e compartilhar minha paixão pelo cinema.</p>
        <p className="text-lg">O blog é feito com muito carinho e dedicação, mirando temáticas e diretores específicos (MORE COMING SOON).</p>
        <p className="text-lg">Seja bem-vindo(a) e aproveite nossas postagens!</p>
        <br/>
        <div className="flex items-center text-lg">
          <span>Críticas e sugestões:</span>
          <a href="mailto:francisdiasbr@gmail.com" className="text-blue-500 hover:underline ml-2">
            francisdiasbr@gmail.com
          </a>
        </div>
      </div>
    </Layout>
  );
} 