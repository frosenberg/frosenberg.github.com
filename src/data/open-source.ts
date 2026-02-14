import type { OpenSourceProject } from "@/types";

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "Fabric for Deep Learning (FfDL)",
    description:
      "A framework-independent training infrastructure for deep learning models on distributed servers (CPUs and GPUs). Enables training of models across multiple deep learning frameworks on Kubernetes.",
    url: "https://github.com/IBM/FfDL",
    role: "Originator",
  },
  {
    name: "Spring Cloud Dataflow for Kubernetes",
    description:
      "Wrote the first implementation allowing Spring Cloud Dataflow pipelines to be executed on a Kubernetes cluster, enabling cloud-native data processing workflows.",
    url: "https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/current/reference/htmlsingle/",
    role: "First Implementation",
  },
];
