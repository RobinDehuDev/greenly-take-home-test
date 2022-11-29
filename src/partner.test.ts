import { getPartnerFromDB } from "./partner";

describe("Partner", () => {
  it("should get a default partner if none match the name", () => {
    const partner = getPartnerFromDB("test");

    expect(partner).not.toBeNull();
  });
});
