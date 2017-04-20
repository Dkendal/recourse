Recourse

Recourse is/was a project that provides an easy way to pick a university schedule. A student would search for a course that meets their criteria, in the iterations presented below that would be a simple text search, and select that course, indicating that they want to add it their schedule.

That's it! The system would regenerate a new schedule each time a course was added, attempting to produce a valid schedule when possible.

In one of the versions presented below certain preferences were takin into account, like a preference of when to start and end the day, or what days to avoid scheduling on.

This is an old version of my Recourse application, I'm open-sourcing it here for educational and demonstration purposes!

I'm hoping to launch the full version of Recourse in the next few months.

This application has seen many rewrites. You, dear reader, may wish to read any one of these branches:

1. [redux-app](https://github.com/Dkendal/recourse/tree/redux-app)

This was about 2 years of on and off development. This uses a hand rolled constraint solver, which i spun out into its own repo [Aruspex](https://github.com/Dkendal/aruspex). The front end is a Redux and React application. It includes a [scraper](https://github.com/Dkendal/recourse/blob/redux-app/lib/recourse/scraper/section/response.ex) to convert the malformed and invalid html the university provides into the domain model. Please don't judge the parser too critically, it was some of the first Elixir I wrote and is my least favourite code in the repo. For comparison this is the current version of the [parser](https://gist.github.com/Dkendal/233650cb78140b509d65c2ab838ea61a), which I actually quite enjoy.

The schedule on the front end is rendered with an inline SVG, generated in react. Some of the server side code uses [Digraph](http://erlang.org/doc/man/digraph.html). It creates a directed graph of the schedule where any given block is a node and there exists an edge between two nodes if there is an overlap. Taking a list of all the components of the graph allowed overlapping blocks on the schedule to be identified, and had the rendering adjusted so that they all fit in the same day column.

[picture coming soon]

Schedule building used the prior mentioned hand rolled solver, which used a simulated annealing optimization strategy. Aruspex was built in about 4 solid months of summer vacation.

This version also took into account up to hour open seat count as part of it's constraints.

2. [python-solver](https://github.com/Dkendal/recourse/tree/python-solver)
This version uses a Python script and the Z3 SMT solver bindings as the backend for the solver.

This uses Elixir's ports to create a sort of poor-mans Elixir-Python interop.

I don't think the front end was ever really worked on for this version.

[Recourse.Solver.Server](https://github.com/Dkendal/recourse/blob/python-solver/apps/solver/lib/solver/server.ex) is a GenServer which runs the [main python script](https://github.com/Dkendal/recourse/blob/python-solver/apps/pysolver/pysolver.py) . The GenServer starts the script through a shell and attaches to the stdin stdout. Communication uses the [MsgPack](http://msgpack.org/index.html) protocol.

I can't remember if this ever actually worked.

## Lessons:
- Most Redux apps turn into a pile of flaming garbage and boilerplate. This is hyperbolic, but I've seen enough Redux apps at this point to draw a conclusion. This is unfortunate because I actually really like FRP. Now a days I'm using Elm for this role and find it much easier. The thing that killed Redux for me was going away from the project for two months and then being filled with dread reading over the sea of selectors, actions, action creators and reducers on my return. Pass.

- Building a Constraint solver was awesome, but not a scalable solution. Also Erlang/OTP is not a good fit for pure computation tasks. Currently I'm using a Java Node and Optaplanner, which has over a decade of fine tuning, bug fixes and optimizations supporting it.

- SMT solvers are not really appropriate for actual _biz_ logic. This stuff is so low level, and implementing basic constraints was incredibility tedious. Required a significant amount of effort to rephrase existing constraints into first-order-logic, that part wasn't too bad though.

Personally, I don't like Z3. I really enjoy declarative programming and first-order-logic, a la _Prolog_. My biggest complaint with Z3 is that it pretends to be a declarative language (program, DSL?), but evaluation is sequentially, at least with the python bindings. This makes creating complex relations really difficult without jumping through hoops with dependency injected functions and the like. Overall it just leaves a bad taste in my mouth.

Ports should be used sparingly. I knew this going in, but interfacing with a script on stdin and stdout for mission critical logic sucks and was really error prone. Sometimes the python interpreter got hung out and would crash. Not fun.


``` python
def define_time_seperate():
    """
    Constraint to specify that and a and b have overlapping times.
    """
    start_time = MeetingTimeSort.start_time
    end_time = MeetingTimeSort.end_time
    x = Const('x', MeetingTimeSort)
    y = Const('y', MeetingTimeSort)
    return [
        # symmetric property
        ForAll(
            [x, y],
            Implies(
                time_seperate(x, y),
                time_seperate(y, x))),

        ForAll(
            [x, y],
            Implies(
                time_seperate(x, y),
                Or(
                    range_disjoint(
                        start_time(y),
                        end_time(y),
                        start_time(x),
                        end_time(x)),
                    range_disjoint(
                        start_time(x),
                        end_time(x),
                        start_time(y),
                        end_time(y)))))
    ]
```
> implying.
