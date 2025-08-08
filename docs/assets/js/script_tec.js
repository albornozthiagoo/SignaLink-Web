import React, { StrictMode, createContext, useCallback, useContext, useEffect, useRef, useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
const data = [
    {
        title: "Protection Score",
        description: "This score measures your overall security strength. Higher score means better protection. Aim to maintain or improve.",
        initialScore: 42
    },
    {
        title: "Investment Score",
        description: "This score measures portfolio alignment with your goals and strategy. Higher score indicates better performance.",
        initialScore: 83
    },
    {
        title: "Financial Fitness",
        description: "Boost financial control in 10 minutes. Get your fitness score—quick, free, no impact on credit or mortgages."
    }
];
const CounterContext = createContext(undefined);
const CounterProvider = ({ children }) => {
    const counterRef = useRef(0);
    const getNextIndex = useCallback(() => {
        return counterRef.current++;
    }, []);
    return (React.createElement(CounterContext.Provider, { value: { getNextIndex } }, children));
};
const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error("useCounter must be used within a CounterProvider");
    }
    return context.getNextIndex;
};
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement("main", null,
        React.createElement(CounterProvider, null, data.map((card, i) => React.createElement(FinancialScore, Object.assign({ key: i }, card)))))));
function FinancialScore({ title, description, initialScore }) {
    const [score, setScore] = useState(initialScore !== null && initialScore !== void 0 ? initialScore : null);
    const hasScore = score !== null;
    const max = 100;
    const strength = Utils.getStrength(score, max);
    /** Generate a random score if not already. */
    function handleGenerateScore() {
        if (!hasScore) {
            setScore(Utils.randomInt(0, max));
        }
    }
    return (React.createElement(FinancialScoreCard, null,
        React.createElement(FinancialScoreHeader, { title: title, strength: strength }),
        React.createElement("div", { className: "card__graph-container" },
            React.createElement(FinancialScoreHalfCircle, { value: score, max: max }),
            React.createElement(FinancialScoreDisplay, { value: score, max: max })),
        React.createElement("p", { className: "card__description" }, description),
        React.createElement(FinancialScoreButton, { isOutlined: hasScore, onClick: handleGenerateScore }, hasScore ? "Learn more" : "Calculate your score")));
}
function FinancialScoreButton({ children, isOutlined, onClick }) {
    const buttonOutline = isOutlined ? " card__score-button--outlined" : "";
    const buttonClass = `card__score-button${buttonOutline}`;
    return (React.createElement("button", { className: buttonClass, type: "button", onClick: onClick }, children));
}
function FinancialScoreCard({ children }) {
    var _a;
    const getNextIndex = useCounter();
    const indexRef = useRef(null);
    const animationRef = useRef(0);
    const containerRef = useRef(null);
    const [animating, setAnimating] = useState(false);
    const [appearing, setAppearing] = useState(false);
    const cardStyle = animating ? { height: `${(_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.scrollHeight}px` } : {};
    if (indexRef.current === null) {
        indexRef.current = getNextIndex();
    }
    // delay the appearance as part of a staggering effect
    useEffect(() => {
        const delayInc = 200;
        const delay = 300 + indexRef.current * delayInc;
        animationRef.current = setTimeout(() => setAppearing(true), delay);
        return () => {
            clearTimeout(animationRef.current);
        };
    }, []);
    // animate the container height
    useEffect(() => {
        var _a, _b;
        if (appearing) {
            setAnimating(true);
            const animContainer = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.animate([
                { height: 0 },
                { height: `${(_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.scrollHeight}px` }
            ], {
                duration: 800,
                easing: Utils.easings.easeOut
            });
            if (animContainer) {
                animContainer.onfinish = () => {
                    setAnimating(false);
                };
            }
        }
    }, [appearing]);
    return (React.createElement("div", { className: "card", style: cardStyle }, appearing &&
        React.createElement("div", { className: "card__surface" },
            React.createElement("div", { className: "card__container", ref: containerRef },
                React.createElement("div", { className: "card__content" }, children)))));
}
function FinancialScoreDisplay({ value, max }) {
    const hasValue = value !== null;
    const scoreAnimated = hasValue ? " card__score--animated" : "";
    const scoreClass = `card__score${scoreAnimated}`;
    const digits = String(Math.floor(value)).split("");
    const maxFormatted = Utils.formatNumber(max);
    const label = hasValue ? `out of ${maxFormatted}` : "No score";
    return (React.createElement("div", { className: "card__score-display" },
        React.createElement("div", { className: scoreClass },
            React.createElement("div", { className: "card__score-digits card__score-digits--dimmed" },
                React.createElement("div", { className: "card__score-digit" }, "0")),
            React.createElement("div", { className: "card__score-digits" }, hasValue && digits.map((digit, i) => (React.createElement("span", { key: i, className: "card__score-digit" }, digit))))),
        React.createElement("div", { className: "card__score-label" }, label)));
}
function FinancialScoreHalfCircle({ value, max }) {
    const strokeRef = useRef(null);
    const gradIdRef = useRef(`grad-${Utils.randomHash()}`);
    const gradId = gradIdRef.current;
    const gradStroke = `url(#${gradId})`;
    const radius = 45;
    const dist = Utils.circumference(radius);
    const distHalf = dist / 2;
    const distFourth = distHalf / 2;
    const strokeDasharray = `${distHalf} ${distHalf}`;
    const distForValue = Math.min(value / max, 1) * -distHalf;
    const strokeDashoffset = value !== null ? distForValue : -distFourth;
    const strength = Utils.getStrength(value, max);
    const strengthColors = {
        none: [
            "light-dark(var(--gray50), var(--gray800))",
            "light-dark(var(--gray400), var(--gray600))"
        ],
        weak: [
            "light-dark(var(--danger200), var(--danger700))",
            "var(--danger500)",
            "light-dark(var(--danger700), var(--danger200))"
        ],
        moderate: [
            "light-dark(var(--warning200), var(--warning700))",
            "var(--warning500)",
            "light-dark(var(--warning600), var(--warning200))"
        ],
        strong: [
            "light-dark(var(--success200), var(--success800))",
            "var(--success500)",
            "light-dark(var(--success700), var(--success300))"
        ]
    };
    const colorStops = strengthColors[strength];
    useEffect(() => {
        var _a;
        const strokeStart = 400;
        const duration = 1400;
        (_a = strokeRef.current) === null || _a === void 0 ? void 0 : _a.animate([
            { strokeDashoffset: 0, offset: 0 },
            { strokeDashoffset: 0, offset: strokeStart / duration },
            { strokeDashoffset }
        ], {
            duration,
            easing: Utils.easings.easeInOut,
            fill: "forwards"
        });
    }, [value, max]);
    return (React.createElement("svg", { className: "card__half-circle", viewBox: "0 0 100 50", "aria-hidden": "true" },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: gradId, x1: "0", y1: "0", x2: "1", y2: "0" }, colorStops.map((stop, i) => {
                const offset = `${100 / (colorStops.length - 1) * i}%`;
                return React.createElement("stop", { key: i, offset: offset, stopColor: stop });
            }))),
        React.createElement("g", { fill: "none", strokeWidth: "10", transform: "translate(50, 50.5)" },
            React.createElement("circle", { className: "card__half-circle-track", r: radius }),
            React.createElement("circle", { ref: strokeRef, stroke: gradStroke, strokeDasharray: strokeDasharray, r: radius }))));
}
function FinancialScoreHeader({ title, strength }) {
    const badgeClass = `card__badge card__badge--${strength}`;
    const hasStrength = strength !== Strength.None;
    return (React.createElement("div", { className: "card__header" },
        React.createElement("h2", { className: "card__title" }, title),
        hasStrength && React.createElement("span", { className: badgeClass }, strength)));
}
class Utils {
    /**
     * Get the circumference of a circle with a given radius.
     * @param r radius
     */
    static circumference(r) {
        return 2 * Math.PI * r;
    }
    /**
     * Format any kind of number to a localized format.
     * @param n number
     */
    static formatNumber(n) {
        return new Intl.NumberFormat(this.LOCALE).format(n);
    }
    /**
     * Get the strength level based on a score.
     * @param score score value
     * @param maxScore max score
     */
    static getStrength(score, maxScore) {
        if (!score)
            return Strength.None;
        const percent = score / maxScore;
        if (percent >= 0.8)
            return Strength.Strong;
        if (percent >= 0.4)
            return Strength.Moderate;
        return Strength.Weak;
    }
    /**
     * Generate a random hash for uniquely identifying entities.
     * @param length number of characters
     */
    static randomHash(length = 4) {
        const chars = "abcdef0123456789";
        const bytes = crypto.getRandomValues(new Uint8Array(length));
        return [...bytes].map(b => chars[b % chars.length]).join("");
    }
    /**
     * Get a random integer between two values.
     * @param min minimum value
     * @param max maximum value
     */
    static randomInt(min = 0, max = 1) {
        const value = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
        return Math.round(min + (max - min) * value);
    }
}
Utils.LOCALE = "en-US";
/** Easings for animations */
Utils.easings = {
    easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    easeOut: "cubic-bezier(0.33, 1, 0.68, 1)"
};
// enums
var Strength;
(function (Strength) {
    Strength["None"] = "none";
    Strength["Weak"] = "weak";
    Strength["Moderate"] = "moderate";
    Strength["Strong"] = "strong";
})(Strength || (Strength = {}));
;
;
;
;
;
;
;