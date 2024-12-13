import { Layout } from '../../components/Layout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AboutUs() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <Avatar className="w-48 h-48">
            <AvatarImage
              src="https://github.com/francisdiasbr.png"
              alt="Francis Dias"
              className="rounded-full border-4 border-slate-200"
            />
            <AvatarFallback className="text-4xl">FD</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold">ABOUT</h1>

            <p className="text-lg">Este blog é fruto de um sonho.</p>
            <p className="text-lg">The Movie Blog é uma iniciativa autoral que surgiu da necessidade de catalogar os filmes que eu assisti e compartilhar minha paixão por cinema.</p>
            <p className="text-lg">O blog é feito com muito carinho e dedicação, mirando temáticas e diretores específicos (MORE COMING SOON).</p>
            <p className="text-lg">Seja bem-vindo(a) e aproveite as postagens e a curadoria de filmes, feita especialmente por mim.</p>
            <div className="flex items-center gap-2">
              <p className="text-lg">Para contribuições, críticas e sugestões entre em contato comigo:</p>
              <a href="mailto:francisdiasbr@gmail.com" className="text-lg text-blue-500 hover:underline">
                francisdiasbr@gmail.com
              </a>
            </div>
            <p className="text-lg">Obrigado pela visita!</p>
            <p className="text-lg">Francis Dias - dezembro de 2024</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 