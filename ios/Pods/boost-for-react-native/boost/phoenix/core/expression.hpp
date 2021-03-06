/*=============================================================================
    Copyright (c) 2016 Kohei Takahashi

    Distributed under the Boost Software License, Version 1.0. (See accompanying 
    file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
==============================================================================*/
#ifndef BOOST_PHOENIX_CORE_EXPRESSION_HPP
#define BOOST_PHOENIX_CORE_EXPRESSION_HPP

#include <boost/phoenix/core/limits.hpp>
#include <boost/call_traits.hpp>
#include <boost/fusion/sequence/intrinsic/at.hpp>
#include <boost/phoenix/core/as_actor.hpp>
#include <boost/phoenix/core/detail/expression.hpp>
#include <boost/phoenix/core/domain.hpp>
#include <boost/proto/domain.hpp>
#include <boost/proto/make_expr.hpp>
#include <boost/proto/transform/pass_through.hpp>

namespace boost { namespace phoenix
{
    template <typename Expr> struct actor;

#ifdef BOOST_PHOENIX_NO_VARIADIC_EXPRESSION
    #include <boost/phoenix/core/detail/cpp03/expression.hpp>
#else
    template <template <typename> class Actor, typename Tag, typename... A>
    struct expr_ext;

    // This void filter is necessary to avoid forming reference to void
    // because most of other expressions are not based on variadics.
    template <typename Tag, typename F, typename... T>
    struct expr_impl;

    template <typename Tag, typename... A>
    struct expr_impl<Tag, void(A...)> : expr_ext<actor, Tag, A...> {};

    template <typename Tag, typename... A, typename... T>
    struct expr_impl<Tag, void(A...), void, T...> : expr_impl<Tag, void(A...)> {};

    template <typename Tag, typename... A, typename H, typename... T>
    struct expr_impl<Tag, void(A...), H, T...> : expr_impl<Tag, void(A..., H), T...> {};

    template <typename Tag, typename... A>
    struct expr : expr_impl<Tag, void(), A...> {};

    template <template <typename> class Actor, typename Tag, typename... A>
    struct expr_ext
        : proto::transform<expr_ext<Actor, Tag, A...>, int>
    {
        typedef
            typename proto::result_of::make_expr<
                Tag
              , phoenix_default_domain //proto::basic_default_domain
              , typename proto::detail::uncvref<typename call_traits<A>::value_type>::type...
            >::type
        base_type;

        typedef Actor<base_type> type;

        typedef typename proto::nary_expr<Tag, A...>::proto_grammar proto_grammar;

        static type make(typename call_traits<A>::param_type... a)
        { //?? actor or Actor??
            //Actor<base_type> const e =
            actor<base_type> const e =
            {
                proto::make_expr<Tag, phoenix_default_domain>(a...)
            };
            return e;
        }

        template<typename Expr, typename State, typename Data>
        struct impl
            : proto::pass_through<expr_ext>::template impl<Expr, State, Data>
        {};

        typedef Tag proto_tag;
    };
#endif
}}

#endif
