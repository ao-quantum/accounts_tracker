import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = param => {
    return /\d+/g.test(param);
}
