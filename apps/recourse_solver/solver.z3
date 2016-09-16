#!./venv/bin/z3 -st
;
(declare-datatypes () ((Pair (mk-pair (first Int) (last Int)))))

(declare-const a Pair)
(declare-const b Pair)
(declare-const c Pair)
(declare-const d Pair)

(declare-const x Pair)
(declare-const y Pair)

(assert (= a (mk-pair 0 2)))
(assert (= b (mk-pair 1 3)))
(assert (= c (mk-pair 2 4)))
(assert (= d (mk-pair 3 5)))

(assert (or (= x a)
            (= x b)
            (= x c)
            (= x d)))

(assert (or (= y a)
            (= y b)
            (= y c)
            (= y d)))
(push)

(assert (or (> (first x) (last y))
            (> (first y) (last x))))

(check-sat)
(get-model)

(get-value (x))
(get-value (y))
