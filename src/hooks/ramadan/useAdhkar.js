import { useState } from "react";

const useAdhkar = () => {
    const adhkar = {
        morning: [
            "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور.",
            "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير.",
            "اللهم إني أسألك خير هذا اليوم فتحه، ونصره، ونوره، وبركته، وهداه، وأعوذ بك من شر ما فيه وشر ما بعده."
        ],
        evening: [
            "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير.",
            "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير.",
            "اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، وأعوذ بك من الجبن والبخل، وأعوذ بك من غلبة الدين وقهر الرجال."
        ],
        afterPrayer: [
            "أستغفر الله، أستغفر الله، أستغفر الله. اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام.",
            "اللهم أعني على ذكرك وشكرك وحسن عبادتك.",
            "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير. اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد."
        ]
    };

    const [currentZikr, setCurrentZikr] = useState("");

    const getRandomZikr = () => {
        const categories = Object.keys(adhkar);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomZikr = adhkar[randomCategory][Math.floor(Math.random() * adhkar[randomCategory].length)];
        setCurrentZikr(randomZikr);
    };

    return { currentZikr, getRandomZikr };
};

export default useAdhkar;
