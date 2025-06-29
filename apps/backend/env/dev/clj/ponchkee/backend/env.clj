(ns ponchkee.backend.env
  (:require
    [clojure.tools.logging :as log]
    [ponchkee.backend.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init       (fn []
                 (log/info "\n-=[backend starting using the development or test profile]=-"))
   :start      (fn []
                 (log/info "\n-=[backend started successfully using the development or test profile]=-"))
   :stop       (fn []
                 (log/info "\n-=[backend has shut down successfully]=-"))
   :middleware wrap-dev
   :opts       {:profile       :dev}})
