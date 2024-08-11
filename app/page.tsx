import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react"
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col gap-4 items-center justify-center h-screen">
    <div className="border border-input h-96 w-96 rounded-md px-4 py-2">
    <h1>Have sex™️</h1>
    </div>
    <div className="flex gap-4">
    <Input className="w-[323px]" />
    <Button className="w-10" size={'icon'} variant={"outline"}>
    <Send className="w-4 h-4" />      
    </Button>
  </div>
</MaxWidthWrapper>
  );
}
