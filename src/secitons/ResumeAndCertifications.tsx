import React from "react";
import { certifications, resumeFile } from "../constants";
import TitleHeader from "../components/TitleHeader";
import { Certification } from "../constants/types";
import { Download, ExternalLink } from "lucide-react";
import OptimizedImage from "../components/OptimizedImage";

const ResumeAndCertifications: React.FC = () => {
  return (
    <section id="resume" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Resume & Certifications"
          sub="📄 My professional credentials"
        />

        {/* Resume Download Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <a
            href={resumeFile}
            download
            className="group block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Download Resume</h3>
                  <p className="text-white-50 text-sm">PDF • Updated January 2026</p>
                </div>
              </div>
              <div className="text-primary group-hover:translate-x-1 transition-transform">
                <ExternalLink className="w-6 h-6" />
              </div>
            </div>
          </a>
        </div>

        {/* Certifications Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Certifications</h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {certifications.map((cert: Certification, index: number) => (
              <div key={index} className="card card-border rounded-xl p-6 break-inside-avoid-column">
                <div className="glow"></div>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-white/5">
                      <OptimizedImage
                        src={cert.imgPath}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-white-50 text-sm">{cert.issuer}</p>
                      <p className="text-white-50 text-xs mt-1">{cert.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>View Credential</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeAndCertifications;
