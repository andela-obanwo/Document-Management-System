

const Sanitize = {
  searchString(req) {
    const query = req.query.query;
    let newQuery = query;
    if (/%/.test(query)) {
      newQuery = query.replace(/%\w\w/g, (candidate) => {
        if (this.checkencoding(candidate)) {
          return decodeURI(candidate);
        }
        return candidate;
      });
    }
    const sanitized = newQuery.replace(/[^a-zA-Z0-9 \s]+/g, '');
    return sanitized;
  },
  checkencoding(entry) {
    const str = `%01,%08,%08,%09,%0A,%0D,%20,%21,%22,%23,%24,%25,%26,%27,%28,
    %29,%2A,%2B,%2C,%2D,%2E,%2F,%30,%31,%32,%33,%34,%35,%36,%37,%38,%39,%3A,
    %3B,%3C,%3D,%3E,%3F,%40,%41,%42,%43,%44,%45,%46,%47,%48,%49,%4A,%4B,%4C,%4D,
    %4E,%4F,%50,%51,%52,%53,%54,%55,%56,%57,%58,%59,%5A,%5B,%5C,%5D,%5E,%5F,%60,
    %63,%64,%65,%66,%67,%68,%69,%6A,%6B,%6C,%6D,%6E,%6F,%70,%71,%72,%73,%74,%75,
    %76,%77,%78,%79,%7A,%7B,%7C,%7D,%7E,%A2,%A3,%A5,%A6,%A7,%AB,%AC,%AD,%B0,%B1,
    %B2,%B4,%B5,%BB,%BC,%BD,%BF,%C0,%C1,%C2,%C3,%C4,%C5,%C6,%C7,%C8,%C9,%CA,%CB,
    %CC,%CD,%CE,%CF,%D0,%D1,%D2,%D3,%D4,%D5,%D6,%D8,%D9,%DA,%DB,%DC,%DD,%DE,%DF,
    %E0,%E1,%E2,%E3,%E4,%E5,%E6,%E7,%E8,%E9,%EA,%EB,%EC,%ED,%EE,%EF,%F0,%F1,%F2,
    %F3,%F4,%F5,%F6,%F7,%F8,%F9,%FA,%FB,%FC,%FD,%FE,%FF,%61,%62`;
    return str.indexOf(entry) !== -1;
  }
};

export default Sanitize;
