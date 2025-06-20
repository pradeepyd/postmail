import { EmailExampleCard } from "@/components/EmailExample"


const PreviewPage = () =>{
    return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-xl font-bold mb-6 pt-8 text-centre">Example Email</h1>
      <EmailExampleCard />
    </div>
    )
}
export default PreviewPage;