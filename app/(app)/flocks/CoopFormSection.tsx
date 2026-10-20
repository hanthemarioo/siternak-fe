"use client";

export type CoopFormItem = {
    name: string;
    initial_population: number | "";
};

interface CoopFormSectionProps {
    coops: CoopFormItem[];
    isEditing: boolean;
    onAdd: () => void;
    onReset: () => void;
    onChange: (index: number, value: string) => void;
}

export function CoopFormSection({
    coops,
    isEditing,
    onAdd,
    onReset,
    onChange,
}: CoopFormSectionProps) {
    return (
        <div className="space-y-3">
            {!isEditing && (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onAdd}
                        className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-3 py-1.5 rounded-lg flex items-center transition-colors text-sm"
                    >
                        Tambah Kandang <span className="ml-1 text-lg leading-none">+</span>
                    </button>
                    <button
                        type="button"
                        onClick={onReset}
                        className="bg-[#ff4757] hover:bg-[#ff6b81] text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
                    >
                        Reset Kandang
                    </button>
                </div>
            )}

            <div className="space-y-2 mt-4">
                {coops.map((coop, index) => (
                    <div
                        key={index}
                        className="flex rounded border border-gray-200 overflow-hidden shadow-sm"
                    >
                        <div className="bg-gray-100 text-gray-600 px-4 py-2 border-r border-gray-200 flex items-center min-w-[120px] justify-center text-sm font-medium">
                            {coop.name}
                        </div>
                        <input
                            readOnly={isEditing}
                            type="number"
                            min="0"
                            className="flex-1 px-4 py-2 text-sm outline-none focus:bg-gray-50 transition-colors"
                            placeholder="Jumlah Ayam"
                            value={coop.initial_population}
                            onChange={(e) => onChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
