import { Button } from "@/components/ui/button"
import { Search, Dices } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export default async function PageHeader() {
    return (
        <div className="flex flex-row items-center justify-between w-full mb-6 space-x-4">
            <InputGroup className="w-full">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>
            <Button variant="outline" size="icon">
                <Dices className="w-4 h-4" />
            </Button>
        </div>
    );
}
